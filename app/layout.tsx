import SectionContact from "@/components/section-contact"
import CookieConsent from "@/features/consent-cookie/cookie-consent"
import Footer from "@/features/layout/footer"
import Navigation from "@/features/layout/navigation"
import { fetchSEOMetadata } from "@/features/seo/action/seo-action"
import { fetchSEOMetadata } from "@/features/seo/action/seo-action"
import { fetchJSONLD } from "@/features/seo/action/json-ld-action"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import SliderSection from "@/features/layout/slider/components/slider"
import { fetchSlider } from "@/features/layout/slider/actions/slider-actions"

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
        {/* Plausible Analytics z env variables */}
        {process.env.ANALYTICS_DOMAIN && process.env.ANALYTICS_URL && (
          <>
            <Script
              defer
              data-domain={process.env.ANALYTICS_DOMAIN}
              src={process.env.ANALYTICS_URL}
              strategy="afterInteractive"
            />
            <Script id="plausible-init" strategy="afterInteractive">
              {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
            </Script>
          </>
        )}

        {/* Google Analytics z env variables */}
        {process.env.GOOGLE_ANALYTICS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
              `}
            </Script>
          </>
        )}

        {/* JSON-LD from CMS */}
        {jsonLd &&
          jsonLd.map((node, idx) => (
            <Script
              key={`json-ld-${idx}`}
              id={`json-ld-${idx}`}
              type="application/ld+json"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
            />
          ))}
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
