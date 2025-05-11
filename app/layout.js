import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL || "http://127.0.0.1:3000";

const inter = Inter({subsets: ["latin"]});

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ]
};

export const metadata = {
  metadataBase: new URL(SITE_BASE_URL),
  title: {
    default: "Skillexa: Technical Courses & AI Mock Interviews",
    template: "%s | Skillexa"
  },
  description:
    "Skillexa offers expert‑led online courses in web development, cybersecurity, data science, cloud, mobile, ML & more—plus AI‑driven mock interviews via voice calls with instant feedback.",
  keywords: [
    "e-learning",
    "technical courses",
    "web development",
    "cybersecurity",
    "data science",
    "mobile development",
    "cloud computing",
    "machine learning",
    "AI mock interviews",
    "voice interview AI",
    "online coding courses",
    "tech upskilling"
  ],
  authors: [{ name: "Skillexa Team", url: SITE_BASE_URL }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },

  openGraph: {
    title: "Skillexa: Technical Courses & AI Mock Interviews",
    description:
      "Master web development, cybersecurity, data science, cloud, mobile, ML & more. Practice with AI‑powered mock interviews via voice calls and get instant feedback.",
    url: `${SITE_BASE_URL}/`,
    siteName: "Skillexa",
    images: [
      {
        url: `${SITE_BASE_URL}/og-image-tech-mockinterview.png`,
        width: 1200,
        height: 630,
        alt: "Skillexa e‑Learning & AI Mock Interviews"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Skillexa: Technical Courses & AI Mock Interviews",
    description:
      "Upskill in web dev, cybersecurity, data science, cloud, mobile, ML & more. AI‑driven mock interviews with voice calls and personalized feedback.",
    images: [`${SITE_BASE_URL}/twitter-tech-mockinterview.jpg`],
    creator: "@SkillexaOfficial"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest",
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
