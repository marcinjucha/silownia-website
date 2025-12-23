import { Suspense } from "react"
import LoadingSpinner from "@/components/loading-spinner"
import SectionContact from "@/components/section-contact"
import { GoogleAnalytics } from "@/features/analytics/components/google-analytics"
import { PlausibleAnalytics } from "@/features/analytics/components/plausible-analytics"
import CookieConsent from "@/features/consent-cookie/cookie-consent"
import Footer from "@/features/layout/footer"
import Navigation from "@/features/layout/navigation"
import { fetchSlider } from "@/features/layout/slider/actions/slider-actions"
import SliderSection from "@/features/layout/slider/components/slider"
import { JsonLdScripts } from "@/features/seo/components/json-ld-scripts"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Progress Gym Wrocław",
  description: "Nowoczesna siłownia i klub fitness",
}

async function SliderWrapper() {
  const slider = await fetchSlider()

  if (!slider.success) return null

  return <SliderSection title={slider.value.title} items={slider.value.sliderItem} />
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl">
      <head>
        {/* Analytics Components */}
        <PlausibleAnalytics />
        <GoogleAnalytics />
      </head>
      <body className="flex min-h-screen flex-col">
        {/* JSON-LD from CMS - moved to body for proper Suspense support */}
        <Suspense fallback={null}>
          <JsonLdScripts />
        </Suspense>

        <Navigation />
        <main className="flex-1">{children}</main>
        <SectionContact />

        <Suspense fallback={<LoadingSpinner />}>
          <SliderWrapper />
        </Suspense>

        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
