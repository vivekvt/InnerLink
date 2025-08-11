import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/providers";
import { appConfig } from "@/lib/appConfig";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: appConfig.name,
  description: appConfig.description,
  keywords: [
    "AI therapy",
    "meditation",
    "mental health",
    "wellness",
    "mindfulness",
    "AI avatar",
    "therapy app",
  ],
  authors: [{ name: "InnerLink Team" }],
  creator: "InnerLink",
  publisher: "InnerLink",

  // Open Graph tags for social media preview
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://innerlink.up.railway.app",
    title: appConfig.name,
    description: appConfig.description,
    siteName: appConfig.name,
    images: [
      {
        url: "/cover.png",
        width: 1200,
        height: 630,
        alt: `${appConfig.name} - ${appConfig.tagline}`,
      },
    ],
  },

  // Twitter Card tags
  twitter: {
    card: "summary_large_image",
    title: appConfig.name,
    description: appConfig.description,
    creator: "@vivekvt_",
    images: ["/cover.png"],
  },

  // Additional meta tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  // Additional metadata
  category: "Health & Wellness",
  classification: "Mental Health App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {/* <Navbar /> */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
