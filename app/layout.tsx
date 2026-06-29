import type { Metadata, Viewport } from "next"
import { IBM_Plex_Sans_Arabic } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { Providers } from "./providers"

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
})

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
    <html lang="ar" dir="rtl" suppressHydrationWarning data-theme-transition>
      <body className={`${arabic.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
