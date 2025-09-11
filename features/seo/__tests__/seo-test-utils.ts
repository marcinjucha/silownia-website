import { createApolloResponse } from "@/features/__tests__/test-utils"
import { SeoResponse } from "@/features/seo/logic/seo-repo"
import { SEOMetadataDTO } from "@/features/seo/logic/seo-type"

export const createMockSEOMetadataDTO = (override?: Partial<SEOMetadataDTO>): SEOMetadataDTO => ({
  title: "Test Title",
  description: "Test Description for SEO testing purposes",
  keywords: ["test", "seo", "keywords"],
  canonical: "https://test.com",
  authors: [{ name: "Test Author", url: "https://author.com" }],
  creator: "Test Creator",
  publisher: "Test Publisher",
  category: "fitness",
  openGraph: {
    title: "OG Test Title",
    description: "OG Test Description",
    type: "website",
    url: "https://test.com",
    locale: "en_US",
    siteName: "Test Site",
    images: [
      {
        url: "/test-image.jpg",
        width: 1200,
        height: 630,
        alt: "Test Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@testsite",
    creator: "@testcreator",
    title: "Twitter Test Title",
    description: "Twitter Test Description",
  },
  verification: {
    google: "google-verification-code",
    bing: "bing-verification-code",
  },
  robots: {
    index: true,
    follow: true,
    maxImagePreview: "large",
    maxSnippet: 160,
  },
  alternates: {
    canonical: "https://test.com",
    languages: {
      en: "https://test.com/en",
      pl: "https://test.com/pl",
    },
  },
  ...override,
})

export const createMockSeoResponse = (override?: Partial<SeoResponse>): SeoResponse => ({
  title: "Test Title",
  description: "Test Description for SEO testing purposes",
  keywords: [{ text: "test" }, { text: "seo" }, { text: "keywords" }],
  authors: [{ name: "Test Author", url: "https://author.com" }],
  creator: "Test Creator",
  publisher: "Test Publisher",
  category: "fitness",
  alternates: {
    canonical: "https://test.com",
    languages: [
      { localeName: "en", url: "https://test.com/en" },
      { localeName: "pl", url: "https://test.com/pl" },
    ],
  },
  openGraph: {
    title: "OG Test Title",
    description: "OG Test Description",
    type: "website",
    url: "https://test.com",
    localeName: "en_US",
    siteName: "Test Site",
    images: [
      {
        url: "/test-image.jpg",
        width: 1200,
        height: 630,
        alternativeText: "Test Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@testsite",
    creator: "@testcreator",
    title: "Twitter Test Title",
    description: "Twitter Test Description",
  },
  verification: {
    google: [{ text: "google-verification-code" }],
    bing: [{ text: "bing-verification-code" }],
  },
  robots: {
    info: {
      index: true,
      follow: true,
      maxImagePreview: "large",
      maxSnippet: 160,
    },
  },
  ...override,
})

export const createMockSeoGraphQLResponse = (seoData?: Partial<SeoResponse>) =>
  createApolloResponse({
    seos: [createMockSeoResponse(seoData)],
  })

export const createMockEmptySeoGraphQLResponse = () =>
  createApolloResponse({
    seos: [],
  })

export const createMockMinimalSeoResponse = (): SeoResponse => ({
  title: "Minimal Title",
  description: "Minimal description for testing basic functionality",
  keywords: [{ text: "minimal" }],
})

export const createMockMinimalSeoGraphQLResponse = () =>
  createApolloResponse({
    seos: [createMockMinimalSeoResponse()],
  })

export const createMockComplexSeoResponse = (): SeoResponse => ({
  title: "Complex SEO Title",
  description: "Complex SEO description with all possible fields for comprehensive testing",
  keywords: [{ text: "complex" }, { text: "seo" }, { text: "testing" }],
  authors: [
    { name: "Primary Author", url: "https://primary-author.com" },
    { name: "Secondary Author", url: "https://secondary-author.com" },
  ],
  creator: "Complex Creator",
  publisher: "Complex Publisher",
  generator: "Next.js",
  applicationName: "Test App",
  category: "technology",
  classification: "web-development",
  alternates: {
    canonical: "https://complex-test.com",
    languages: [
      { localeName: "en", url: "https://complex-test.com/en" },
      { localeName: "pl", url: "https://complex-test.com/pl" },
      { localeName: "de", url: "https://complex-test.com/de" },
    ],
  },
  openGraph: {
    title: "Complex OG Title",
    description: "Complex OpenGraph description",
    type: "article",
    url: "https://complex-test.com",
    localeName: "en_US",
    siteName: "Complex Test Site",
    email: "contact@complex-test.com",
    phoneNumber: "+48123456789",
    images: [
      {
        url: "/complex-image-1.jpg",
        width: 1200,
        height: 630,
        alternativeText: "Complex Image 1",
        mime: "image/jpeg",
      },
      {
        url: "/complex-image-2.jpg",
        width: 800,
        height: 600,
        alternativeText: "Complex Image 2",
        mime: "image/jpeg",
      },
    ],
    videos: [
      {
        url: "/complex-video.mp4",
        width: 1920,
        height: 1080,
        mime: "video/mp4",
      },
    ],
    audio: [
      {
        url: "/complex-audio.mp3",
        mime: "audio/mpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@complexsite",
    creator: "@complexcreator",
    title: "Complex Twitter Title",
    description: "Complex Twitter description",
    images: [{ text: "/twitter-image.jpg" }],
  },
  verification: {
    google: [{ text: "google-complex-code" }],
    bing: [{ text: "bing-complex-code" }],
    yahoo: [{ text: "yahoo-complex-code" }],
    yandex: [{ text: "yandex-complex-code" }],
  },
  robots: {
    info: {
      index: true,
      follow: true,
      maxImagePreview: "large",
      maxSnippet: 200,
      maxVideoPreview: 120,
    },
    googleBot: {
      info: {
        index: false,
        follow: true,
        maxImagePreview: "standard",
        maxSnippet: 100,
        maxVideoPreview: 60,
      },
    },
  },
})

export const createMockComplexSeoGraphQLResponse = () =>
  createApolloResponse({
    seos: [createMockComplexSeoResponse()],
  })

// JSON-LD Test Utilities
import {
  JsonLdArticleDTO,
  JsonLdEventDTO,
  JsonLdOrganizationDTO,
  JsonLdPersonDTO,
  JsonLdProductDTO,
  JsonLdRecipeDTO,
} from "@/features/seo/logic/json-ld-type"

export const createMockJsonLdArticleDTO = (
  override?: Partial<JsonLdArticleDTO>,
): JsonLdArticleDTO => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Test Article Headline",
  description: "Test article description for JSON-LD testing",
  datePublished: "2024-01-01T00:00:00Z",
  dateModified: "2024-01-02T00:00:00Z",
  author: {
    "@type": "Organization",
    name: "Test Author Organization",
    url: "https://test-author.com",
    logo: {
      "@type": "ImageObject",
      url: "https://test.com/author-logo.jpg",
      name: "Author Logo",
    },
    sameAs: ["https://twitter.com/testauthor"],
  },
  image: {
    "@type": "ImageObject",
    url: "https://test.com/article-image.jpg",
    name: "Article Image",
  },
  publisher: {
    "@type": "Organization",
    name: "Test Publisher",
    url: "https://test-publisher.com",
    logo: {
      "@type": "ImageObject",
      url: "https://test.com/publisher-logo.jpg",
      name: "Publisher Logo",
    },
  },
  wordCount: 1500,
  ...override,
})

export const createMockJsonLdProductDTO = (
  override?: Partial<JsonLdProductDTO>,
): JsonLdProductDTO => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Test Product",
  description: "Test product description for JSON-LD testing",
  brand: {
    "@type": "Brand",
    name: "Test Brand",
  },
  sku: "TEST-SKU-123",
  offers: [
    {
      "@type": "Offer",
      price: 99.99,
      priceCurrency: "PLN",
      availability: "InStock",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.5,
    reviewCount: 100,
    bestRating: 5,
    worstRating: 1,
  },
  image: {
    "@type": "ImageObject",
    url: "https://test.com/product-image.jpg",
    name: "Product Image",
  },
  ...override,
})

export const createMockJsonLdPersonDTO = (
  override?: Partial<JsonLdPersonDTO>,
): JsonLdPersonDTO => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Test Person",
  jobTitle: "Test Job Title",
  worksFor: {
    "@type": "Organization",
    name: "Test Company",
    url: "https://test-company.com",
    logo: {
      "@type": "ImageObject",
      url: "https://test.com/company-logo.jpg",
      name: "Company Logo",
    },
    sameAs: ["https://linkedin.com/company/testcompany"],
  },
  url: "https://test-person.com",
  sameAs: ["https://twitter.com/testperson", "https://linkedin.com/in/testperson"],
  ...override,
})

export const createMockJsonLdOrganizationDTO = (
  override?: Partial<JsonLdOrganizationDTO>,
): JsonLdOrganizationDTO => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Test Organization",
  url: "https://test-organization.com",
  logo: {
    "@type": "ImageObject",
    url: "https://test.com/org-logo.jpg",
    name: "Organization Logo",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+48123456789",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Test Street 123",
    addressLocality: "Test City",
    postalCode: "12-345",
    addressCountry: "PL",
  },
  sameAs: ["https://facebook.com/testorg", "https://twitter.com/testorg"],
  ...override,
})

export const createMockJsonLdEventDTO = (override?: Partial<JsonLdEventDTO>): JsonLdEventDTO => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Test Event",
  description: "Test event description for JSON-LD testing",
  startDate: "2024-06-01T10:00:00Z",
  endDate: "2024-06-01T18:00:00Z",
  location: {
    "@type": "Place",
    name: "Test Venue",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Event Street 456",
      addressLocality: "Event City",
      postalCode: "67-890",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.2297,
      longitude: 21.0122,
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Test Event Organizer",
  },
  offers: [
    {
      "@type": "Offer",
      price: 50.0,
      priceCurrency: "PLN",
      availability: "InStock",
    },
  ],
  ...override,
})

export const createMockJsonLdRecipeDTO = (
  override?: Partial<JsonLdRecipeDTO>,
): JsonLdRecipeDTO => ({
  "@context": "https://schema.org",
  "@type": "Recipe",
  name: "Test Recipe",
  description: "Test recipe description for JSON-LD testing",
  image: "https://test.com/recipe-image.jpg",
  author: {
    "@type": "Person",
    name: "Test Chef",
    url: "https://test-chef.com",
    image: "https://test.com/chef-image.jpg",
    email: "chef@test.com",
    telephone: "+48987654321",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chef Street 789",
      addressLocality: "Chef City",
      postalCode: "11-222",
      addressCountry: "PL",
    },
  },
  recipeIngredient: ["1 cup flour", "2 eggs", "1/2 cup milk"],
  recipeInstructions: [
    {
      "@type": "HowToStep",
      name: "Step 1",
      text: "Mix flour and eggs",
    },
    {
      "@type": "HowToStep",
      name: "Step 2",
      text: "Add milk gradually",
    },
  ],
  keywords: ["test", "recipe", "cooking"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.8,
    reviewCount: 50,
    bestRating: 5,
    worstRating: 1,
  },
  ...override,
})

// GraphQL Response types for JSON-LD (internal to repository)
type JsonLdArticleResponse = {
  __typename: "ComponentJsonLdArticle"
  articleType?: string
  headline?: string
  articleAuthor?: {
    type?: string
    name: string
    url?: { url: string; alternativeText?: string }
    sameAs?: { url: string }[]
  }
  datePublished?: string
  dateModified?: string
  description?: string
  image?: { url: string; alternativeText?: string }
  publisher?: {
    type?: string
    name: string
    url?: string
    logo?: { url: string; alternativeText?: string }
  }
  wordCount?: number
}

type JsonLdProductResponse = {
  __typename: "ComponentJsonLdProduct"
  productType?: string
  name?: string
  description?: string
  brand?: { type?: string; name: string }
  sku?: string
  offers?: Array<{
    type?: string
    price?: number
    priceCurrency?: string
    availability?: string
  }>
  aggregateRating?: {
    type?: string
    ratingValue?: number
    reviewCount?: number
    bestRating?: number
    worstRating?: number
  }
  image?: { url: string; alternativeText?: string }
}

type JsonLdPersonResponse = {
  __typename: "ComponentJsonLdPerson"
  personType?: string
  name?: string
  jobTitle?: string
  worksFor?: {
    type?: string
    name: string
    url?: { url: string; alternativeText?: string }
    sameAs?: { url: string }[]
  }
  personUrl?: string
  sameAs?: { url: string }[]
}

type JsonLdOrganizationResponse = {
  __typename: "ComponentJsonLdOrganization"
  organizationType?: string
  name?: string
  organizationUrl?: string
  logo?: { url: string; alternativeText?: string }
  contactPoint?: { type?: string; telephone?: string }
  postalAddress?: {
    type?: string
    streetAddress?: string
    addressLocality?: string
    postalCode?: string
    addressCountry?: string
  }
  sameAs?: { url: string }[]
}

type JsonLdEventResponse = {
  __typename: "ComponentJsonLdEvent"
  eventType?: string
  name?: string
  description?: string
  startDate?: string
  endDate?: string
  location?: {
    type?: string
    name?: string
    address?: {
      type?: string
      streetAddress?: string
      addressLocality?: string
      postalCode?: string
      addressCountry?: string
    }
    geo?: {
      type?: string
      latitude?: number
      longitude?: number
    }
  }
  organizer?: { type?: string; name?: string }
  offers?: Array<{
    type?: string
    price?: number
    priceCurrency?: string
    availability?: string
  }>
}

type JsonLdRecipeResponse = {
  __typename: "ComponentJsonLdRecipe"
  recipeType?: string
  name?: string
  description?: string
  imageURL?: string
  author?: {
    type?: string
    name: string
    url?: string
    imageURL?: string
    email?: string
    telephone?: string
    address?: {
      type?: string
      streetAddress?: string
      addressLocality?: string
      postalCode?: string
      addressCountry?: string
    }
  }
  recipeIngredient?: { text: string }[]
  recipeInstructions?: Array<{
    type?: string
    name?: string
    text?: string
  }>
  keywords?: { text: string }[]
  aggregateRating?: {
    type?: string
    ratingValue?: number
    reviewCount?: number
    bestRating?: number
    worstRating?: number
  }
}

export const createMockJsonLdArticleResponse = (
  override?: Partial<JsonLdArticleResponse>,
): JsonLdArticleResponse => ({
  __typename: "ComponentJsonLdArticle",
  articleType: "Article",
  headline: "Test Article Headline",
  articleAuthor: {
    type: "Organization",
    name: "Test Author Organization",
    url: { url: "https://test-author.com", alternativeText: "Author URL" },
    sameAs: [{ url: "https://twitter.com/testauthor" }],
  },
  datePublished: "2024-01-01T00:00:00Z",
  dateModified: "2024-01-02T00:00:00Z",
  description: "Test article description for JSON-LD testing",
  image: { url: "/article-image.jpg", alternativeText: "Article Image" },
  publisher: {
    type: "Organization",
    name: "Test Publisher",
    url: "https://test-publisher.com",
    logo: { url: "/publisher-logo.jpg", alternativeText: "Publisher Logo" },
  },
  wordCount: 1500,
  ...override,
})

export const createMockJsonLdProductResponse = (
  override?: Partial<JsonLdProductResponse>,
): JsonLdProductResponse => ({
  __typename: "ComponentJsonLdProduct",
  productType: "Product",
  name: "Test Product",
  description: "Test product description for JSON-LD testing",
  brand: { type: "Brand", name: "Test Brand" },
  sku: "TEST-SKU-123",
  offers: [
    {
      type: "Offer",
      price: 99.99,
      priceCurrency: "PLN",
      availability: "InStock",
    },
  ],
  aggregateRating: {
    type: "AggregateRating",
    ratingValue: 4.5,
    reviewCount: 100,
    bestRating: 5,
    worstRating: 1,
  },
  image: { url: "/product-image.jpg", alternativeText: "Product Image" },
  ...override,
})

export const createMockJsonLdPersonResponse = (
  override?: Partial<JsonLdPersonResponse>,
): JsonLdPersonResponse => ({
  __typename: "ComponentJsonLdPerson",
  personType: "Person",
  name: "Test Person",
  jobTitle: "Test Job Title",
  worksFor: {
    type: "Organization",
    name: "Test Company",
    url: { url: "https://test-company.com", alternativeText: "Company URL" },
    sameAs: [{ url: "https://linkedin.com/company/testcompany" }],
  },
  personUrl: "https://test-person.com",
  sameAs: [
    { url: "https://twitter.com/testperson" },
    { url: "https://linkedin.com/in/testperson" },
  ],
  ...override,
})

export const createMockJsonLdOrganizationResponse = (
  override?: Partial<JsonLdOrganizationResponse>,
): JsonLdOrganizationResponse => ({
  __typename: "ComponentJsonLdOrganization",
  organizationType: "Organization",
  name: "Test Organization",
  organizationUrl: "https://test-organization.com",
  logo: { url: "/org-logo.jpg", alternativeText: "Organization Logo" },
  contactPoint: { type: "ContactPoint", telephone: "+48123456789" },
  postalAddress: {
    type: "PostalAddress",
    streetAddress: "Test Street 123",
    addressLocality: "Test City",
    postalCode: "12-345",
    addressCountry: "PL",
  },
  sameAs: [{ url: "https://facebook.com/testorg" }, { url: "https://twitter.com/testorg" }],
  ...override,
})

export const createMockJsonLdEventResponse = (
  override?: Partial<JsonLdEventResponse>,
): JsonLdEventResponse => ({
  __typename: "ComponentJsonLdEvent",
  eventType: "Event",
  name: "Test Event",
  description: "Test event description for JSON-LD testing",
  startDate: "2024-06-01T10:00:00Z",
  endDate: "2024-06-01T18:00:00Z",
  location: {
    type: "Place",
    name: "Test Venue",
    address: {
      type: "PostalAddress",
      streetAddress: "Event Street 456",
      addressLocality: "Event City",
      postalCode: "67-890",
      addressCountry: "PL",
    },
    geo: {
      type: "GeoCoordinates",
      latitude: 52.2297,
      longitude: 21.0122,
    },
  },
  organizer: { type: "Organization", name: "Test Event Organizer" },
  offers: [
    {
      type: "Offer",
      price: 50.0,
      priceCurrency: "PLN",
      availability: "InStock",
    },
  ],
  ...override,
})

export const createMockJsonLdRecipeResponse = (
  override?: Partial<JsonLdRecipeResponse>,
): JsonLdRecipeResponse => ({
  __typename: "ComponentJsonLdRecipe",
  recipeType: "Recipe",
  name: "Test Recipe",
  description: "Test recipe description for JSON-LD testing",
  imageURL: "https://test.com/recipe-image.jpg",
  author: {
    type: "Person",
    name: "Test Chef",
    url: "https://test-chef.com",
    imageURL: "https://test.com/chef-image.jpg",
    email: "chef@test.com",
    telephone: "+48987654321",
    address: {
      type: "PostalAddress",
      streetAddress: "Chef Street 789",
      addressLocality: "Chef City",
      postalCode: "11-222",
      addressCountry: "PL",
    },
  },
  recipeIngredient: [{ text: "1 cup flour" }, { text: "2 eggs" }, { text: "1/2 cup milk" }],
  recipeInstructions: [
    { type: "HowToStep", name: "Step 1", text: "Mix flour and eggs" },
    { type: "HowToStep", name: "Step 2", text: "Add milk gradually" },
  ],
  keywords: [{ text: "test" }, { text: "recipe" }, { text: "cooking" }],
  aggregateRating: {
    type: "AggregateRating",
    ratingValue: 4.8,
    reviewCount: 50,
    bestRating: 5,
    worstRating: 1,
  },
  ...override,
})

// GraphQL response creators for different JSON-LD types
export const createMockJsonLdGraphQLResponse = (
  jsonLdData?: Array<{
    type: Array<
      | JsonLdArticleResponse
      | JsonLdProductResponse
      | JsonLdPersonResponse
      | JsonLdOrganizationResponse
      | JsonLdEventResponse
      | JsonLdRecipeResponse
    >
  }>,
) =>
  createApolloResponse({
    jsonLds: jsonLdData || [
      {
        type: [createMockJsonLdArticleResponse()],
      },
    ],
  })

export const createMockEmptyJsonLdGraphQLResponse = () =>
  createApolloResponse({
    jsonLds: [],
  })

export const createMockMixedJsonLdGraphQLResponse = () =>
  createApolloResponse({
    jsonLds: [
      {
        type: [
          createMockJsonLdArticleResponse(),
          createMockJsonLdProductResponse(),
          createMockJsonLdPersonResponse(),
        ],
      },
    ],
  })
