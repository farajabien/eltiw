import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ELTIW - Every Lil Thing I Want",
    template: "%s | ELTIW"
  },
  description: "Track your personal goals with deadline planning, progress tracking, and secure link-based sharing. Built with enterprise-ready Slug Store technology for instant persistence without databases.",
  keywords: [
    "goal tracking",
    "wishlist",
    "savings calculator",
    "progress tracking",
    "financial planning",
    "deadline management",
    "shareable goals",
    "no database",
    "slug store"
  ],
  authors: [{ name: "Bienvenu Faraja", url: "https://fbien.com" }],
  creator: "Bienvenu Faraja",
  publisher: "FBIEN",
  metadataBase: new URL("https://eltiw.fbien.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eltiw.fbien.com",
    siteName: "ELTIW",
    title: "ELTIW - Every Lil Thing I Want",
    description: "Track your personal goals with deadline planning, progress tracking, and secure link-based sharing.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ELTIW - Goal Tracking Made Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ELTIW - Every Lil Thing I Want",
    description: "Track your personal goals with deadline planning, progress tracking, and secure link-based sharing.",
    images: ["/og-image.png"],
    creator: "@farajabien",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <PerformanceMonitor />
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center">
              <div className="mr-4 hidden md:flex">
                <Link className="mr-6 flex items-center space-x-2" href="/">
                  <span className="hidden font-bold sm:inline-block">
                    ELTIW
                  </span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <Link
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    href="/goals"
                  >
                    My Goals
                  </Link>
                  <Link
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    href="/about"
                  >
                    About
                  </Link>
                </nav>
              </div>
              <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <div className="w-full flex-1 md:w-auto md:flex-none">
                  <button className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
                    <span className="hidden lg:inline-flex">Search goals...</span>
                    <span className="inline-flex lg:hidden">Search...</span>
                  </button>
                </div>
                <nav className="flex items-center">
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
                    <span className="sr-only">Toggle theme</span>
                    🌙
                  </button>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 md:py-0 mx-auto">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Built by{" "}
                  <a
                    href="https://fbien.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    Bienvenu Faraja
                  </a>
                  . Powered by{" "}
                  <a
                    href="https://github.com/farajabien/slug-store"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    Slug Store
                  </a>
                  .
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
