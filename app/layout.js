import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL || "http://127.0.0.1:3000";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "Skillexa - Learn Skills Online from Experts",
  description: "Master new skills with Skillexa, the best online learning platform. Explore expert-led courses on programming, design, marketing, and more.",
  
  openGraph: {
    title: "Skillexa - Learn Skills Online from Experts",
    description: "Master new skills with Skillexa, the best online learning platform. Explore expert-led courses on programming, design, marketing, and more.",
    url: `${SITE_BASE_URL}/`,
    siteName: "Skillexa",
    images: [
      {
        url: `${SITE_BASE_URL}/icons/icon.png`, 
        width: 1200,
        height: 630,
        alt: "Skillexa - Learn Skills Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Skillexa - Learn Skills Online from Experts",
    description: "Upgrade your skills with high-quality online courses from Skillexa. Learn coding, design, and business from top instructors.",
    images: [`${SITE_BASE_URL}/twitter-image.jpg`],
    creator: "@SkillexaOfficial",
  },

  icons: {
    icon: "/favicon.ico", // 32x32 px favicon
    shortcut: "/favicon-16x16.png", // 16x16 px
    apple: "/apple-touch-icon.png", 
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster expand={true} richColors={true} closeButton={true}/>
        
      </body>
    </html>
  );
}
