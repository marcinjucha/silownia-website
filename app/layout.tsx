import SectionContact from "@/components/section-contact"
import { GoogleAnalytics } from "@/features/analytics/components/google-analytics"
import { PlausibleAnalytics } from "@/features/analytics/components/plausible-analytics"
import CookieConsent from "@/features/consent-cookie/cookie-consent"
import Footer from "@/features/layout/footer"
import Navigation from "@/features/layout/navigation"
import { fetchSlider } from "@/features/layout/slider/actions/slider-actions"
import SliderSection from "@/features/layout/slider/components/slider"
import { fetchSEOMetadata } from "@/features/seo/action/seo-action"
import { JsonLdScripts } from "@/features/seo/components/json-ld-scripts"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSEOMetadata()
  return seo ?? {}
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
        {/* Analytics Components */}
        <PlausibleAnalytics />
        <GoogleAnalytics />

        {/* JSON-LD from CMS */}
        <JsonLdScripts />
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
