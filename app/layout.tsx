import SectionContact from "@/components/section-contact"
import CookieConsent from "@/features/consent-cookie/cookie-consent"
import Footer from "@/features/layout/footer"
import Navigation from "@/features/layout/navigation"
import { fetchSEOMetadata } from "@/features/seo/action/seo-action"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSEOMetadata()

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      url: seo.openGraph.url,
      type: seo.openGraph.type,
      images: [
        {
          url: seo.openGraph.image.url,
          width: seo.openGraph.image.width,
          height: seo.openGraph.image.height,
          alt: seo.openGraph.image.alt,
        },
      ],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl">
      <body className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        {/* <SectionContact /> */}
        <Footer />
        {/* <CookieConsent /> */}
      </body>
    </html>
  )
}
