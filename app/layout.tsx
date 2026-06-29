import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "HLOS — منصة تعلّم تقنية المعلومات الصحية",
    template: "%s | HLOS",
  },
  description: "Healthcare IT Learning OS — منصة تعليمية متخصصة لمحترفي تقنية المعلومات الصحية في السعودية والخليج",
  keywords: ["healthcare IT", "تقنية المعلومات الصحية", "HIMSS", "تعليم طبي", "GCC"],
  authors: [{ name: "HLOS Team" }],
  creator: "HLOS",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://hlos.sa"),
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://hlos.sa",
    title: "HLOS — منصة تعلّم تقنية المعلومات الصحية",
    description: "منصة تعليمية متخصصة لمحترفي تقنية المعلومات الصحية في السعودية والخليج",
    siteName: "HLOS",
  },
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)",  color: "#0f172a" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-theme-transition>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
