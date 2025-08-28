import { Metadata } from "next"

// Internal DTO Types (transformed from GraphQL Response to use across application layers)

// Basic Types
export type SEOOpenGraphType = "website" | "article" | "book" | "profile"

export type SEOTwitterCard = "summary" | "summary_large_image" | "app" | "player"

export type SEOAuthorDTO = {
  name: string // wymagane, min. 1 znak
  url?: string // opcjonalne, walidowany URL
}

export type SEORobotsDTO = {
  index?: boolean // domyślnie: true
  follow?: boolean // domyślnie: true
  maxImagePreview?: "none" | "standard" | "large"
  maxSnippet?: number // integer
  maxVideoPreview?: number | "none" | "standard" | "large"
  googleBot?: {
    index?: boolean
    follow?: boolean
    maxImagePreview?: "none" | "standard" | "large"
    maxSnippet?: number
    maxVideoPreview?: number | "none" | "standard" | "large"
  }
}

export type SEOImageDTO = {
  url: string // wymagane, z makeAssetUrl
  width?: number // opcjonalne
  height?: number // opcjonalne
  alt?: string // alternativeText
  type?: string // mime type
}

export type SEOVideoDTO = {
  url: string // wymagane
  width?: number // opcjonalne
  height?: number // opcjonalne
  type?: string // mime type
}

export type SEOAudioDTO = {
  url: string // wymagane
  type?: string // mime type
}

export type SEOOpenGraphDTO = {
  title?: string // max. 60 znaków
  description?: string // 50-160 znaków
  type?: SEOOpenGraphType // enum, domyślnie: website
  url?: string // walidowany URL
  locale?: string // regex: [a-z]{2}(-[A-Z]{2})?
  siteName?: string // wymagane w CMS
  images?: SEOImageDTO[] // multiple media
  videos?: SEOVideoDTO[] // multiple media
  audio?: SEOAudioDTO[] // multiple media
  emails?: string[] // email kontaktowy
  phoneNumbers?: string[] // numer telefonu
}

export type SEOTwitterDTO = {
  card?: SEOTwitterCard // enum: summary, summary_large_image
  site?: string // handle strony (wymagane w CMS)
  creator?: string // handle twórcy (wymagane w CMS)
  title?: string // wymagane w CMS
  description?: string // wymagane w CMS
  images?: string[] // TextArray, powtarzalne
}

export type SEOAlternatesDTO = {
  canonical?: string // walidowany URL
  languages?: Record<string, string> // localeName -> URL
}

export type SEOVerificationDTO = {
  google?: string // pierwszy kod z TextArray
  bing?: string // pierwszy kod z TextArray
  yahoo?: string // pierwszy kod z TextArray
  yandex?: string // pierwszy kod z TextArray
}

// Main SEO DTO - używany w Use Cases, Actions, Components
export type SEOMetadataDTO = {
  // Podstawowe pola obowiązkowe (w CMS)
  title: string // max. 60 znaków, wymagane
  description: string // 50-160 znaków, wymagane
  keywords?: string[] // słowa kluczowe (wymagane w CMS, powtarzalne)

  // Pola opcjonalne
  applicationName?: string // nazwa aplikacji
  generator?: string // generator strony
  creator?: string // twórca
  publisher?: string // wydawca
  category?: string // kategoria
  canonical?: string // URL kanoniczny

  // Komponenty SEO
  authors?: SEOAuthorDTO[] // autorzy (powtarzalne)
  robots?: SEORobotsDTO // ustawienia robotów
  verification?: SEOVerificationDTO // weryfikacja wyszukiwarek
  openGraph?: SEOOpenGraphDTO // Facebook/Social Media
  twitter?: SEOTwitterDTO // Twitter Cards
  alternates?: SEOAlternatesDTO // wersje językowe

  // Dodatkowe pola (poza CMS)
  themeColor?: string
  viewport?: {
    width?: string
    initialScale?: number
    maximumScale?: number
    userScalable?: boolean
  }
  icons?: {
    icon?: string | string[]
    apple?: string | string[]
    shortcut?: string
  }
}

// JSON-LD Types (future extension)
export type SEOJsonLdDTO = {
  "@context": string
  "@type": "Organization" | "LocalBusiness" | "Article" | "WebSite"
  name?: string
  description?: string
  url?: string
  logo?: string
  address?: {
    "@type": "PostalAddress"
    streetAddress: string
    addressLocality: string
    postalCode: string
    addressCountry: string
  }
  telephone?: string
  openingHours?: string[]
  sameAs?: string[]
}

// Export for Next.js Metadata compatibility
export type NextjsMetadata = Metadata
