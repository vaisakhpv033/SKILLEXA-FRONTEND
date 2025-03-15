import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = {
  instructor: "/instructor",
  student: "/student",
  admin: "/admin",
};


// Define routes that should be accessible only to logged-out users
const authRoutes = ["/login", "/register/student", "/register/instructor"];


export async function authMiddleware(req) {

    // Get the user's token
    const token = await getToken({ req });
    //console.log("token:",token);
    const { pathname } = req.nextUrl;


    // Allow public access to landing page (`/`)
    if (pathname === "/") {
        if (!token){
            return NextResponse.next();
        }
        if (token?.user?.user?.role === 1) {
            return NextResponse.redirect(new URL("/student", req.url));
        }
        if (token?.user?.user?.role === 2) {
            return NextResponse.redirect(new URL("/instructor", req.url));
        }
        if (token?.user?.user?.role === 3) {
            return NextResponse.redirect(new URL("/admin", req.url));
        }
    }

    // Restrict access to auth pages (`/login`, `/register`) for logged-in users
    if (authRoutes.includes(pathname) && token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // If user is not logged in and tries to access a protected route, redirect to login
    if (!token?.user?.user?.role && Object.values(protectedRoutes).some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Role-based route protection
    if (pathname.startsWith(protectedRoutes.admin) && token?.user?.user?.role !== 3) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith(protectedRoutes.instructor) && token?.user?.user?.role !== 2) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith(protectedRoutes.student) && token?.user?.user?.role !== 1) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
}