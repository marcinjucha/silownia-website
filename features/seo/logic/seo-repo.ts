"use server"

import { cacheLife, cacheTag } from "next/cache"
import { gql } from "@apollo/client"
import { makeAssetUrl } from "@/features/common/common-repos"
import {
  SEOMetadataDTO,
  SEOOpenGraphType,
  SEOImageDTO,
  SEOVideoDTO,
  SEOAudioDTO,
  SEORobotsDTO,
  SEOTwitterCard,
} from "@/features/seo/logic/seo-type"
import { graphqlFetch } from "@/lib/graph-ql/fetch-client"

// GraphQL Response Types (based on actual CMS schema from seo-scheme.md)

// Helper Components (utils)
export type TextArrayResponse = {
  text: string
}

export type URLValueResponse = {
  url: string
}

export type EmailValueResponse = {
  email: string
}

// Media Response (for images, videos, audio)
export type MediaResponse = {
  url: string
  width?: number
  height?: number
  alternativeText?: string
  mime?: string
}

// SEO Component Responses
export type AuthorResponse = {
  name: string // wymagane, min. 1 znak
  url?: string // opcjonalne, walidowany URL
}

export type RobotsInfoResponse = {
  index?: boolean // domyślnie: true
  follow?: boolean // domyślnie: true
  maxVideoPreview?: number // integer
  maxImagePreview?: string // enum: none, standard, large
  maxSnippet?: number // integer
}

export type RobotsResponse = {
  info?: RobotsInfoResponse
  googleBot?: {
    info?: RobotsInfoResponse
  }
}

export type OpenGraphResponse = {
  title?: string // max. 60 znaków
  description?: string // 50-160 znaków
  url?: string // walidowany URL
  type?: string // enum: website (domyślnie)
  siteName?: string // wymagane
  localeName?: string // regex: [a-z]{2}(-[A-Z]{2})?
  images?: MediaResponse[] // media, multiple
  videos?: MediaResponse[] // media, multiple
  audio?: MediaResponse[] // media, multiple
  email?: string // email kontaktowy
  phoneNumber?: string // numer telefonu
}

export type TwitterResponse = {
  card?: string // enum: summary, summary_large_image
  site?: string // handle strony (wymagane)
  creator?: string // handle twórcy (wymagane)
  title?: string // wymagane
  description?: string // wymagane
  images?: TextArrayResponse[] // TextArray, powtarzalne
}

export type LanguageResponse = {
  localeName?: string // [a-z]{2}(-[A-Z]{2})?, domyślnie: en
  url: string // wymagane, walidowany
}

export type AlternateUrlsResponse = {
  canonical?: string // walidowany URL
  languages?: LanguageResponse[] // powtarzalne
}

export type VerificationResponse = {
  google?: TextArrayResponse[] // kody Google (TextArray, powtarzalne)
  bing?: TextArrayResponse[] // kody Bing (TextArray, powtarzalne)
  yahoo?: TextArrayResponse[] // kody Yahoo (TextArray, powtarzalne)
  yandex?: TextArrayResponse[] // kody Yandex (TextArray, powtarzalne)
}

// Main SEO Response
export type SeoResponse = {
  // Podstawowe pola obowiązkowe
  title?: string // max. 60 znaków, wymagane
  description?: string // 50-160 znaków, wymagane
  keywords?: TextArrayResponse[] // słowa kluczowe (wymagane, powtarzalne)

  // Pola opcjonalne
  applicationName?: string // nazwa aplikacji
  generator?: string // generator strony
  creator?: string // twórca
  publisher?: string // wydawca
  category?: string // kategoria
  classification?: string // klasyfikacja

  // Komponenty SEO
  authors?: AuthorResponse[] // autorzy (powtarzalne)
  robots?: RobotsResponse // ustawienia robotów
  openGraph?: OpenGraphResponse // Facebook/Social Media
  twitter?: TwitterResponse // Twitter Cards
  alternates?: AlternateUrlsResponse // wersje językowe
  verification?: VerificationResponse // weryfikacja wyszukiwarek
}

const listQuery = `
  fragment ComponentMetadataVerificationFragment on ComponentMetadataVerification {
    bing {
      text
    }
    google {
      text
    }
    yahoo {
      text
    }
    yandex {
      text
    }
  }

  fragment ComponentMetadataAlternateUrLsFragment on ComponentMetadataAlternateUrLs {
    canonical
    languages {
      localeName
      url
    }
  }

  fragment ComponentMetadataRobotsFragment on ComponentMetadataRobots {
    info {
      ...ComponentMetadataRobotsInfoFragment
    }
    googleBot {
      info {
        ...ComponentMetadataRobotsInfoFragment
      }
    }
  }

  fragment ComponentMetadataTwitterFragment on ComponentMetadataTwitter {
    card
    site
    creator
    title
    description
    images {
      text
    }
  }

  fragment ComponentMetadataOpenGraphFragment on ComponentMetadataOpenGraph {
    type
    localeName
    title
    description
    email
    phoneNumber
    siteName
    url
    images {
      url
      width
      height
      alternativeText
      mime
    }
    videos {
      url
      width
      height
      mime
    }
    audio {
      url
      mime
    }
  }

  fragment ComponentMetadataRobotsInfoFragment on ComponentMetadataRobotsInfo {
    index
    follow
    maxImagePreview
    maxSnippet
    maxVideoPreview
  }

  query Seos {
    seos {
      title
      description
      keywords {
        text
      }
      authors {
        name
        url
      }
      creator
      publisher
      generator
      applicationName
      category
      classification
      robots {
        ...ComponentMetadataRobotsFragment
      }
      openGraph {
        ...ComponentMetadataOpenGraphFragment
      }
      twitter {
        ...ComponentMetadataTwitterFragment
      }
      alternates {
        ...ComponentMetadataAlternateUrLsFragment
      }
      verification {
        ...ComponentMetadataVerificationFragment
      }
    }
  }
`

// Mapping functions from GraphQL Response to internal DTO
function mapRobotsResponseToDTO(robotsResponse?: RobotsResponse): SEORobotsDTO | undefined {
  if (!robotsResponse) return undefined

  return {
    index: robotsResponse.info?.index,
    follow: robotsResponse.info?.follow,
    maxImagePreview: robotsResponse.info?.maxImagePreview as
      | "none"
      | "standard"
      | "large"
      | undefined,
    maxSnippet: robotsResponse.info?.maxSnippet,
    maxVideoPreview: robotsResponse.info?.maxVideoPreview as
      | number
      | "none"
      | "standard"
      | "large"
      | undefined,
    googleBot: robotsResponse.googleBot?.info
      ? {
          index: robotsResponse.googleBot.info.index,
          follow: robotsResponse.googleBot.info.follow,
          maxImagePreview: robotsResponse.googleBot.info.maxImagePreview as
            | "none"
            | "standard"
            | "large"
            | undefined,
          maxSnippet: robotsResponse.googleBot.info.maxSnippet,
          maxVideoPreview: robotsResponse.googleBot.info.maxVideoPreview as
            | number
            | "none"
            | "standard"
            | "large"
            | undefined,
        }
      : undefined,
  }
}

function mapMediaResponseToImageDTOs(media?: MediaResponse[]): SEOImageDTO[] | undefined {
  if (!media || media.length === 0) return undefined

  return media.map((item: MediaResponse) => ({
    url: makeAssetUrl(item.url),
    width: item.width,
    height: item.height,
    alt: item.alternativeText,
    type: item.mime,
  }))
}

function mapMediaResponseToVideoDTOs(media?: MediaResponse[]): SEOVideoDTO[] | undefined {
  if (!media || media.length === 0) return undefined

  return media.map((item: MediaResponse) => ({
    url: item.url,
    width: item.width,
    height: item.height,
    type: item.mime,
  }))
}

function mapMediaResponseToAudioDTOs(media?: MediaResponse[]): SEOAudioDTO[] | undefined {
  if (!media || media.length === 0) return undefined

  return media.map((item: MediaResponse) => ({
    url: item.url,
    type: item.mime,
  }))
}

function mapTextArrayToStrings(textArray?: TextArrayResponse[]): string[] | undefined {
  if (!textArray || textArray.length === 0) return undefined
  return textArray.map(item => item.text)
}

function mapVerificationResponseToDTO(
  verification?: VerificationResponse,
): SEOMetadataDTO["verification"] {
  if (!verification) return undefined

  return {
    google: verification.google?.[0]?.text,
    bing: verification.bing?.[0]?.text,
    yahoo: verification.yahoo?.[0]?.text,
    yandex: verification.yandex?.[0]?.text,
  }
}

function validateSEOFields(seo: SeoResponse): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // Title validation (required, max 60 chars)
  if (!seo.title || seo.title.trim().length === 0) {
    errors.push("Title is required")
  } else if (seo.title.length > 60) {
    errors.push("Title should be max 60 characters")
  }

  // Description validation (required, 50-160 chars)
  if (!seo.description || seo.description.trim().length === 0) {
    errors.push("Description is required")
  } else if (seo.description.length < 50 || seo.description.length > 160) {
    errors.push("Description should be between 50-160 characters")
  }

  // Keywords validation (required in CMS)
  if (!seo.keywords || seo.keywords.length === 0) {
    errors.push("Keywords are required")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

function mapSeoResponseToDTO(seoResponse: SeoResponse): SEOMetadataDTO {
  // Validate SEO fields according to best practices
  const validation = validateSEOFields(seoResponse)
  if (!validation.isValid) {
    console.warn("SEO validation warnings:", validation.errors)
  }

  // Required fields with fallbacks
  const title = seoResponse.title || "Progress Gym Wrocław - Nowoczesny klub fitness"
  const description =
    seoResponse.description || "Nowoczesna siłownia i klub fitness przy ul. Paprotnej 14A"

  const dto: SEOMetadataDTO = {
    title,
    description,
    keywords: mapTextArrayToStrings(seoResponse.keywords),
    authors: seoResponse.authors?.map(author => ({
      name: author.name,
      url: author.url,
    })),
    creator: seoResponse.creator,
    publisher: seoResponse.publisher,
    generator: seoResponse.generator,
    applicationName: seoResponse.applicationName,
    category: seoResponse.category,
    canonical: seoResponse.alternates?.canonical || process.env.HOST_URL,
    robots: mapRobotsResponseToDTO(seoResponse.robots),
    verification: mapVerificationResponseToDTO(seoResponse.verification),
    openGraph: seoResponse.openGraph
      ? {
          title: seoResponse.openGraph.title || title,
          description: seoResponse.openGraph.description || description,
          type: (seoResponse.openGraph.type as SEOOpenGraphType) || "website",
          url:
            seoResponse.openGraph.url || seoResponse.alternates?.canonical || process.env.HOST_URL,
          locale: seoResponse.openGraph.localeName,
          siteName: seoResponse.openGraph.siteName,
          images: mapMediaResponseToImageDTOs(seoResponse.openGraph.images),
          videos: mapMediaResponseToVideoDTOs(seoResponse.openGraph.videos),
          audio: mapMediaResponseToAudioDTOs(seoResponse.openGraph.audio),
          emails: seoResponse.openGraph.email ? [seoResponse.openGraph.email] : undefined,
          phoneNumbers: seoResponse.openGraph.phoneNumber
            ? [seoResponse.openGraph.phoneNumber]
            : undefined,
        }
      : undefined,
    twitter: seoResponse.twitter
      ? {
          card: (seoResponse.twitter.card as SEOTwitterCard) || "summary_large_image",
          site: seoResponse.twitter.site,
          creator: seoResponse.twitter.creator,
          title: seoResponse.twitter.title,
          description: seoResponse.twitter.description,
          images: mapTextArrayToStrings(seoResponse.twitter.images),
        }
      : undefined,
    alternates: {
      canonical: seoResponse.alternates?.canonical,
      languages: seoResponse.alternates?.languages?.reduce(
        (acc, lang) => {
          acc[lang.localeName || "en"] = lang.url
          return acc
        },
        {} as Record<string, string>,
      ),
    },
  }

  return dto
}

export async function fetchSeoFromCMS(): Promise<SEOMetadataDTO> {
  const result = await graphqlFetch<{ seos: SeoResponse[] }>(listQuery)

  if (!result?.seos || result.seos.length === 0) {
    throw new Error("No SEO data found in CMS response")
  }

  const seoData = result.seos[0]
  const mappedResult = mapSeoResponseToDTO(seoData)

  return mappedResult
}
