import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt, { decode } from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

async function refreshAccessToken(token) {
    console.log("trying to get refresh token")
    try {
      const response = await axios.post(`${API_BASE_URL}/accounts/token/refresh/`, {
        refresh: token.refreshToken,
      });
      
      const decodedToken = jwt.decode(response.data.access);

      
      console.log("new tokens: ", response.data);
      return {
        ...token,
        accessToken: response.data.access,
        refreshToken: response.data.refresh || token.refreshToken,
        accessTokenExpires: decodedToken.exp * 1000,
      };
    } catch (error) {
      console.error("Refresh token error, logging user out.", error);
  
      return {
        accessToken: null,
        refreshToken: null,
        accessTokenExpires: 0,
        user: null,
        error: "RefreshTokenExpired",
      };
    }
}
  

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${API_BASE_URL}/accounts/login/`, {
            email: credentials.email,
            password: credentials.password,
          });
          const { access, refresh } = response.data;
          if (!access) return null;

          // Decode JWT to extract user details
          const decodedToken = jwt.decode(access);

          return {
            accessToken: access,
            refreshToken: refresh,
            accessTokenExpires: decodedToken.exp * 1000,
            user: {
              id: decodedToken.user_id,
              username: decodedToken.username,
              role: decodedToken.role,
            },
          };
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      async profile(profile, account) {
        const { email, name, sub } = profile;
        const idToken = account.id_token;
        console.log("sending the request")
        // Send user data to Django backend to create user & get JWT tokens
        const response = await axios.post(`${API_BASE_URL}/accounts/google-login/`, {
          email,
          name,
          idToken,
        });

        const { access, refresh } = response.data;
        const decodedToken = jwt.decode(access);
        console.log(response.data)
        return {
          id: sub,
          accessToken: access,
          refreshToken: refresh,
          accessTokenExpires: decodedToken.exp * 1000,
          user: {
            id: decodedToken.user_id,
            username: decodedToken.username,
            role: decodedToken.role,
          },
        };
      },


    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
          user: user,
        };
      }


      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      const refreshedToken = await refreshAccessToken(token);

      return {
        ...token,
        accessToken: refreshedToken.accessToken,
        refreshToken: refreshedToken.refreshToken,
        accessTokenExpires: refreshedToken.accessTokenExpires,
        user: refreshedToken.user,
      };
    },

    async session({ session, token }) {
        // Log user out if refresh failed
        if (!token.accessToken || token.error === "RefreshTokenExpired") {
            return null; 
        }
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.user = token.user;
        return session;
    },


    async redirect({ url, baseUrl}) {
      // Get user role from session
      const role = url?.includes("student")
        ? "student"
        : url?.includes("instructor")
        ? "instructor"
        : url?.includes("admin")
        ? "admin"
        : null;

      if (role === "student") return `${baseUrl}/student`;
      if (role === "instructor") return `${baseUrl}/instructor`;
      if (role === "admin") return `${baseUrl}/admin`;

      return baseUrl; // Default fallback
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
