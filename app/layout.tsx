import SectionContact from "@/components/section-contact"
import CookieConsent from "@/features/consent-cookie/cookie-consent"
import Footer from "@/features/layout/footer"
import Navigation from "@/features/layout/navigation"
import { fetchSEOMetadata } from "@/features/seo/action/seo-action"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import SliderSection from "@/features/layout/slider/components/slider"
import { fetchSlider } from "@/features/layout/slider/actions/slider-actions"

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const slider = await fetchSlider()

  return (
    <html lang="pl">
      <head>
        <Script
          defer
          data-domain={process.env.ANALYTICS_DOMAIN}
          src={process.env.ANALYTICS_URL}
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
        </Script>
      </head>
      <body className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <SectionContact />
        {slider.success && (
          <SliderSection title={slider.value.title} items={slider.value.sliderItem} />
        )}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
