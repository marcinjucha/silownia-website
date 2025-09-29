"use server"

import { makeAssetUrl } from "@/features/common/common-repos"
import { JsonLdDTO } from "@/features/seo/logic/json-ld-type"
import client, { gql } from "@/lib/graph-ql/client"
import { handleGraphQLQuery } from "@/lib/graph-ql/graphql-utils"

// GraphQL fragments aligned with the documented JSON-LD schema
const listQuery = gql`
  fragment JsonLdOfferFragment on ComponentJsonLdOffer {
    type
    price
    priceCurrency
    availability
  }

  fragment JsonLdBrandFragment on ComponentJsonLdBrand {
    type
    name
  }

  fragment JsonLdAggregateRatingFragment on ComponentJsonLdAggregateRating {
    type
    ratingValue
    reviewCount
    bestRating
    worstRating
  }

  fragment JsonLdOrganizationDataFragment on ComponentJsonLdOrganizationData {
    type
    name
    url {
      url
      alternativeText
    }
    sameAs {
      url
    }
  }

  fragment JsonLdPublisherFragment on ComponentJsonLdPublisher {
    type
    name
    url
    logo {
      url
      alternativeText
    }
  }

  fragment JsonLdPersonDataFragment on ComponentJsonLdPersonData {
    type
    name
    url
    imageURL
    email
    telephone
    address {
      ...JsonLdPostalAddressFragment
    }
  }

  fragment JsonLdPostalAddressFragment on ComponentJsonLdPostalAddress {
    type
    streetAddress
    addressLocality
    postalCode
    addressCountry
  }

  fragment JsonLdContactPointFragment on ComponentJsonLdContactPoint {
    type
    telephone
  }

  fragment JsonLdHowToStepFragment on ComponentJsonLdHowToStep {
    type
    name
    text
  }

  fragment JsonLdLocationFragment on ComponentJsonLdLocation {
    type
    name
    address {
      ...JsonLdPostalAddressFragment
    }
    geo {
      ...JsonLdGeoCoordinatesFragment
    }
  }

  fragment JsonLdGeoCoordinatesFragment on ComponentJsonLdGeoCoordinates {
    type
    latitude
    longitude
  }

  fragment JsonLdEventOrganizerFragment on ComponentJsonLdEventOrganizer {
    type
    name
  }

  query JsonLds {
    jsonLds {
      type {
        ... on ComponentJsonLdArticle {
          __typename
          articleType: type # ALIAS - enum type
          headline
          articleAuthor {
            ...JsonLdOrganizationDataFragment
          }
          datePublished
          dateModified
          description
          image {
            url
            alternativeText
          }
          publisher {
            ...JsonLdPublisherFragment
          }
          wordCount
        }

        ... on ComponentJsonLdProduct {
          __typename
          productType: type # ALIAS - string type
          name
          description
          brand {
            ...JsonLdBrandFragment
          }
          sku
          offers {
            ...JsonLdOfferFragment
          }
          aggregateRating {
            ...JsonLdAggregateRatingFragment
          }
          image {
            url
            alternativeText
          }
        }

        ... on ComponentJsonLdPerson {
          __typename
          personType: type # ALIAS - string type
          name
          jobTitle
          worksFor {
            ...JsonLdOrganizationDataFragment
          }
          personUrl: url # ALIAS - optional url
          sameAs {
            url
          }
        }

        ... on ComponentJsonLdOrganization {
          __typename
          organizationType: type # ALIAS - string type
          name
          organizationUrl: url # ALIAS - optional url
          logo {
            url
            alternativeText
          }
          contactPoint {
            ...JsonLdContactPointFragment
          }
          postalAddress {
            ...JsonLdPostalAddressFragment
          }
          sameAs {
            url
          }
        }

        ... on ComponentJsonLdEvent {
          __typename
          eventType: type # ALIAS - string type
          name
          description
          startDate
          endDate
          location {
            ...JsonLdLocationFragment
          }
          organizer {
            ...JsonLdEventOrganizerFragment
          }
          offers {
            ...JsonLdOfferFragment
          }
        }

        ... on ComponentJsonLdRecipe {
          __typename
          recipeType: type # ALIAS - string type
          name
          description
          imageURL
          author {
            ...JsonLdPersonDataFragment
          }
          recipeIngredient {
            text
          }
          recipeInstructions {
            ...JsonLdHowToStepFragment
          }
          keywords {
            text
          }
          aggregateRating {
            ...JsonLdAggregateRatingFragment
          }
        }
      }
    }
  }
`

// GraphQL Response Types for JSON-LD Components

// Helper components
type TextArrayResponse = {
  text: string
}

type URLValueResponse = {
  url: string
}

type MediaResponse = {
  url: string
  alternativeText?: string
}

// Basic JSON-LD Components
type JsonLdOfferResponse = {
  type?: string
  price?: number
  priceCurrency?: string
  availability?: string
}

type JsonLdBrandResponse = {
  type?: string
  name: string
}

type JsonLdAggregateRatingResponse = {
  type?: string
  ratingValue?: number
  reviewCount?: number
  bestRating?: number
  worstRating?: number
}

type JsonLdPostalAddressResponse = {
  type?: string
  streetAddress?: string
  addressLocality?: string
  postalCode?: string
  addressCountry?: string
}

type JsonLdOrganizationDataResponse = {
  type?: string
  name: string
  url?: {
    url: string
    alternativeText?: string
  }
  sameAs?: URLValueResponse[]
}

type JsonLdPublisherResponse = {
  type?: string
  name: string
  url?: string
  logo?: MediaResponse
}

type JsonLdPersonDataResponse = {
  type?: string
  name: string
  url?: string
  imageURL?: string
  email?: string
  telephone?: string
  address?: JsonLdPostalAddressResponse
}

type JsonLdContactPointResponse = {
  type?: string
  telephone?: string
}

type JsonLdHowToStepResponse = {
  type?: string
  name?: string
  text?: string
}

type JsonLdGeoCoordinatesResponse = {
  type?: string
  latitude?: number
  longitude?: number
}

type JsonLdLocationResponse = {
  type?: string
  name?: string
  address?: JsonLdPostalAddressResponse
  geo?: JsonLdGeoCoordinatesResponse
}

type JsonLdEventOrganizerResponse = {
  type?: string
  name?: string
}

// Main JSON-LD Component Responses
type JsonLdArticleResponse = {
  __typename: "ComponentJsonLdArticle"
  articleType?: string
  headline?: string
  articleAuthor?: JsonLdOrganizationDataResponse
  datePublished?: string
  dateModified?: string
  description?: string
  image?: MediaResponse
  publisher?: JsonLdPublisherResponse
  wordCount?: number
}

type JsonLdProductResponse = {
  __typename: "ComponentJsonLdProduct"
  productType?: string
  name?: string
  description?: string
  brand?: JsonLdBrandResponse
  sku?: string
  offers?: JsonLdOfferResponse[]
  aggregateRating?: JsonLdAggregateRatingResponse
  image?: MediaResponse
}

type JsonLdPersonResponse = {
  __typename: "ComponentJsonLdPerson"
  personType?: string
  name?: string
  jobTitle?: string
  worksFor?: JsonLdOrganizationDataResponse
  personUrl?: string
  sameAs?: URLValueResponse[]
}

type JsonLdOrganizationResponse = {
  __typename: "ComponentJsonLdOrganization"
  organizationType?: string
  name?: string
  organizationUrl?: string
  logo?: MediaResponse
  contactPoint?: JsonLdContactPointResponse
  postalAddress?: JsonLdPostalAddressResponse
  sameAs?: URLValueResponse[]
}

type JsonLdEventResponse = {
  __typename: "ComponentJsonLdEvent"
  eventType?: string
  name?: string
  description?: string
  startDate?: string
  endDate?: string
  location?: JsonLdLocationResponse
  organizer?: JsonLdEventOrganizerResponse
  offers?: JsonLdOfferResponse[]
}

type JsonLdRecipeResponse = {
  __typename: "ComponentJsonLdRecipe"
  recipeType?: string
  name?: string
  description?: string
  imageURL?: string
  author?: JsonLdPersonDataResponse
  recipeIngredient?: TextArrayResponse[]
  recipeInstructions?: JsonLdHowToStepResponse[]
  keywords?: TextArrayResponse[]
  aggregateRating?: JsonLdAggregateRatingResponse
}

// Union type for all JSON-LD components - type is an array
type JsonLdCMSItem = {
  type: (
    | JsonLdArticleResponse
    | JsonLdProductResponse
    | JsonLdPersonResponse
    | JsonLdOrganizationResponse
    | JsonLdEventResponse
    | JsonLdRecipeResponse
  )[]
}

function asImageObject(image?: MediaResponse | null) {
  if (!image?.url) return undefined
  return {
    "@type": "ImageObject",
    url: makeAssetUrl(image.url),
    name: image.alternativeText,
  }
}

function asOrganizationData(data?: JsonLdOrganizationDataResponse) {
  if (!data) return undefined
  return {
    "@type": data.type || "Person",
    name: data.name,
    url: data.url?.url,
    logo: asImageObject(data.url),
    sameAs: Array.isArray(data.sameAs) ? data.sameAs.map(s => s.url) : undefined,
  }
}

function asPersonData(data?: JsonLdPersonDataResponse) {
  if (!data) return undefined
  return {
    "@type": data.type || "Person",
    name: data.name,
    url: data.url,
    image: data.imageURL,
    email: data.email,
    telephone: data.telephone,
    address: data.address
      ? {
          "@type": data.address.type || "PostalAddress",
          streetAddress: data.address.streetAddress,
          addressLocality: data.address.addressLocality,
          postalCode: data.address.postalCode,
          addressCountry: data.address.addressCountry,
        }
      : undefined,
  }
}

function mapArticle(item: JsonLdArticleResponse, context: string): JsonLdDTO {
  return {
    "@context": context,
    "@type": item.articleType || "Article",
    headline: item.headline,
    description: item.description,
    datePublished: item.datePublished,
    dateModified: item.dateModified,
    author: asOrganizationData(item.articleAuthor),
    image: asImageObject(item.image),
    publisher: item.publisher
      ? {
          "@type": item.publisher.type || "Organization",
          name: item.publisher.name,
          url: item.publisher.url,
          logo: asImageObject(item.publisher.logo),
        }
      : undefined,
    wordCount: item.wordCount,
  }
}

function mapProduct(item: JsonLdProductResponse, context: string): JsonLdDTO {
  return {
    "@context": context,
    "@type": item.productType || "Product",
    name: item.name,
    description: item.description,
    brand: item.brand
      ? {
          "@type": item.brand.type || "Brand",
          name: item.brand.name,
        }
      : undefined,
    sku: item.sku,
    offers: Array.isArray(item.offers)
      ? item.offers.map(o => ({
          "@type": o.type || "Offer",
          price: o.price,
          priceCurrency: o.priceCurrency || "PLN",
          availability: o.availability,
        }))
      : undefined,
    aggregateRating: item.aggregateRating
      ? {
          "@type": item.aggregateRating.type || "AggregateRating",
          ratingValue: item.aggregateRating.ratingValue,
          reviewCount: item.aggregateRating.reviewCount,
          bestRating: item.aggregateRating.bestRating,
          worstRating: item.aggregateRating.worstRating,
        }
      : undefined,
    image: asImageObject(item.image),
  }
}

function mapPerson(item: JsonLdPersonResponse, context: string): JsonLdDTO {
  return {
    "@context": context,
    "@type": item.personType || "Person",
    name: item.name,
    jobTitle: item.jobTitle,
    worksFor: asOrganizationData(item.worksFor),
    url: item.personUrl,
    sameAs: Array.isArray(item.sameAs) ? item.sameAs.map(s => s.url) : undefined,
  }
}

function mapOrganization(item: JsonLdOrganizationResponse, context: string): JsonLdDTO {
  return {
    "@context": context,
    "@type": item.organizationType || "Organization",
    name: item.name,
    url: item.organizationUrl,
    logo: asImageObject(item.logo),
    contactPoint: item.contactPoint
      ? {
          "@type": item.contactPoint.type || "ContactPoint",
          telephone: item.contactPoint.telephone,
        }
      : undefined,
    address: item.postalAddress
      ? {
          "@type": item.postalAddress.type || "PostalAddress",
          streetAddress: item.postalAddress.streetAddress,
          addressLocality: item.postalAddress.addressLocality,
          postalCode: item.postalAddress.postalCode,
          addressCountry: item.postalAddress.addressCountry,
        }
      : undefined,
    sameAs: Array.isArray(item.sameAs) ? item.sameAs.map(s => s.url) : undefined,
  }
}

function mapEvent(item: JsonLdEventResponse, context: string): JsonLdDTO {
  return {
    "@context": context,
    "@type": item.eventType || "Event",
    name: item.name,
    description: item.description,
    startDate: item.startDate,
    endDate: item.endDate,
    location: item.location
      ? {
          "@type": item.location.type || "Place",
          name: item.location.name,
          address: item.location.address
            ? {
                "@type": item.location.address.type || "PostalAddress",
                streetAddress: item.location.address.streetAddress,
                addressLocality: item.location.address.addressLocality,
                postalCode: item.location.address.postalCode,
                addressCountry: item.location.address.addressCountry,
              }
            : undefined,
          geo: item.location.geo
            ? {
                "@type": item.location.geo.type || "GeoCoordinates",
                latitude: item.location.geo.latitude,
                longitude: item.location.geo.longitude,
              }
            : undefined,
        }
      : undefined,
    organizer: item.organizer
      ? { "@type": item.organizer.type || "Organization", name: item.organizer.name }
      : undefined,
    offers: Array.isArray(item.offers)
      ? item.offers.map(o => ({
          "@type": o.type || "Offer",
          price: o.price,
          priceCurrency: o.priceCurrency || "PLN",
          availability: o.availability,
        }))
      : undefined,
  }
}

function mapRecipe(item: JsonLdRecipeResponse, context: string): JsonLdDTO {
  return {
    "@context": context,
    "@type": item.recipeType || "Recipe",
    name: item.name,
    description: item.description,
    image: item.imageURL,
    author: asPersonData(item.author),
    recipeIngredient: Array.isArray(item.recipeIngredient)
      ? item.recipeIngredient.map(t => t.text)
      : undefined,
    recipeInstructions: Array.isArray(item.recipeInstructions)
      ? item.recipeInstructions.map(step => ({
          "@type": step.type || "HowToStep",
          name: step.name,
          text: step.text,
        }))
      : undefined,
    keywords: Array.isArray(item.keywords) ? item.keywords.map(t => t.text) : undefined,
    aggregateRating: item.aggregateRating
      ? {
          "@type": item.aggregateRating.type || "AggregateRating",
          ratingValue: item.aggregateRating.ratingValue,
          reviewCount: item.aggregateRating.reviewCount,
          bestRating: item.aggregateRating.bestRating,
          worstRating: item.aggregateRating.worstRating,
        }
      : undefined,
  }
}

function validateRequiredFields(
  item:
    | JsonLdArticleResponse
    | JsonLdProductResponse
    | JsonLdPersonResponse
    | JsonLdOrganizationResponse
    | JsonLdEventResponse
    | JsonLdRecipeResponse,
  type: string,
): boolean {
  switch (type) {
    case "ComponentJsonLdArticle":
      const article = item as JsonLdArticleResponse
      return !!(article.headline && article.articleAuthor?.name)
    case "ComponentJsonLdProduct":
      const product = item as JsonLdProductResponse
      return !!product.name
    case "ComponentJsonLdPerson":
      const person = item as JsonLdPersonResponse
      return !!person.name
    case "ComponentJsonLdOrganization":
      const org = item as JsonLdOrganizationResponse
      return !!(org.name && org.organizationUrl)
    case "ComponentJsonLdEvent":
      const event = item as JsonLdEventResponse
      return !!(event.name && event.startDate && event.location?.name)
    case "ComponentJsonLdRecipe":
      const recipe = item as JsonLdRecipeResponse
      return !!(
        recipe.name &&
        recipe.recipeIngredient?.length &&
        recipe.recipeIngredient.length > 0
      )
    default:
      return false
  }
}

function mapSingleComponent(
  component:
    | JsonLdArticleResponse
    | JsonLdProductResponse
    | JsonLdPersonResponse
    | JsonLdOrganizationResponse
    | JsonLdEventResponse
    | JsonLdRecipeResponse,
  context: string,
): JsonLdDTO | undefined {
  if (!component.__typename) {
    console.warn("Missing __typename in component:", component)
    return undefined
  }

  if (!validateRequiredFields(component, component.__typename)) {
    console.warn(`JSON-LD validation failed for ${component.__typename}:`, component)
    return undefined
  }

  switch (component.__typename) {
    case "ComponentJsonLdArticle":
      return mapArticle(component as JsonLdArticleResponse, context)
    case "ComponentJsonLdProduct":
      return mapProduct(component as JsonLdProductResponse, context)
    case "ComponentJsonLdPerson":
      return mapPerson(component as JsonLdPersonResponse, context)
    case "ComponentJsonLdOrganization":
      return mapOrganization(component as JsonLdOrganizationResponse, context)
    case "ComponentJsonLdEvent":
      return mapEvent(component as JsonLdEventResponse, context)
    case "ComponentJsonLdRecipe":
      return mapRecipe(component as JsonLdRecipeResponse, context)
    default:
      console.warn(`Unknown JSON-LD component type: ${(component as any).__typename}`)
      return undefined
  }
}

function mapCMSItemToJsonLd(item: JsonLdCMSItem): JsonLdDTO[] {
  const context = "https://schema.org"

  if (!item.type || !Array.isArray(item.type) || item.type.length === 0) {
    console.warn("Missing or empty type array in JSON-LD item:", item)
    return []
  }

  const mapped = item.type
    .map(component => mapSingleComponent(component, context))
    .filter((x): x is JsonLdDTO => Boolean(x))

  return mapped
}

export async function fetchJsonLdFromCMS(): Promise<JsonLdDTO[]> {
  const result = await client.query<{ jsonLds: JsonLdCMSItem[] }>({ query: listQuery })

  const data = handleGraphQLQuery(result).jsonLds

  if (!data || data.length === 0) {
    throw new Error("No JSON-LD data found in CMS response")
  }

  const mapped = data
    .map(mapCMSItemToJsonLd)
    .flat()
    .filter((x): x is JsonLdDTO => Boolean(x))

  if (mapped.length === 0) {
    console.warn("All JSON-LD items failed validation - no valid structured data found")
    throw new Error("No valid JSON-LD data after validation")
  }

  return mapped
}
