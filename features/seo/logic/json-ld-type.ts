import { ClientResult } from "@/lib/error-handling"

// Specific JSON-LD types based on what our mapping functions return

export type JsonLdArticleDTO = {
  "@context": string
  "@type": string
  headline?: string
  description?: string
  datePublished?: string
  dateModified?: string
  author?: {
    "@type": string
    name: string
    url?: string
    logo?: {
      "@type": string
      url: string
      name?: string
    }
    sameAs?: string[]
  }
  image?: {
    "@type": string
    url: string
    name?: string
  }
  publisher?: {
    "@type": string
    name: string
    url?: string
    logo?: {
      "@type": string
      url: string
      name?: string
    }
  }
  wordCount?: number
}

export type JsonLdProductDTO = {
  "@context": string
  "@type": string
  name?: string
  description?: string
  brand?: {
    "@type": string
    name: string
  }
  sku?: string
  offers?: Array<{
    "@type": string
    price?: number
    priceCurrency?: string
    availability?: string
  }>
  aggregateRating?: {
    "@type": string
    ratingValue?: number
    reviewCount?: number
    bestRating?: number
    worstRating?: number
  }
  image?: {
    "@type": string
    url: string
    name?: string
  }
}

export type JsonLdPersonDTO = {
  "@context": string
  "@type": string
  name?: string
  jobTitle?: string
  worksFor?: {
    "@type": string
    name: string
    url?: string
    logo?: {
      "@type": string
      url: string
      name?: string
    }
    sameAs?: string[]
  }
  url?: string
  sameAs?: string[]
}

export type JsonLdOrganizationDTO = {
  "@context": string
  "@type": string
  name?: string
  url?: string
  logo?: {
    "@type": string
    url: string
    name?: string
  }
  contactPoint?: {
    "@type": string
    telephone?: string
  }
  address?: {
    "@type": string
    streetAddress?: string
    addressLocality?: string
    postalCode?: string
    addressCountry?: string
  }
  sameAs?: string[]
}

export type JsonLdEventDTO = {
  "@context": string
  "@type": string
  name?: string
  description?: string
  startDate?: string
  endDate?: string
  location?: {
    "@type": string
    name?: string
    address?: {
      "@type": string
      streetAddress?: string
      addressLocality?: string
      postalCode?: string
      addressCountry?: string
    }
    geo?: {
      "@type": string
      latitude?: number
      longitude?: number
    }
  }
  organizer?: {
    "@type": string
    name?: string
  }
  offers?: Array<{
    "@type": string
    price?: number
    priceCurrency?: string
    availability?: string
  }>
}

export type JsonLdRecipeDTO = {
  "@context": string
  "@type": string
  name?: string
  description?: string
  image?: string
  author?: {
    "@type": string
    name: string
    url?: string
    image?: string
    email?: string
    telephone?: string
    address?: {
      "@type": string
      streetAddress?: string
      addressLocality?: string
      postalCode?: string
      addressCountry?: string
    }
  }
  recipeIngredient?: string[]
  recipeInstructions?: Array<{
    "@type": string
    name?: string
    text?: string
  }>
  keywords?: string[]
  aggregateRating?: {
    "@type": string
    ratingValue?: number
    reviewCount?: number
    bestRating?: number
    worstRating?: number
  }
}

// Union type for all JSON-LD DTOs
export type JsonLdDTO =
  | JsonLdArticleDTO
  | JsonLdProductDTO
  | JsonLdPersonDTO
  | JsonLdOrganizationDTO
  | JsonLdEventDTO
  | JsonLdRecipeDTO

// Fetcher signature used by the use case
export type FetchJsonLd = () => Promise<JsonLdDTO[]>

// Convenience alias for the use case result
export type JsonLdClientResult = ClientResult<JsonLdDTO[]>
