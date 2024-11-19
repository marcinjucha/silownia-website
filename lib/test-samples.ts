import { ImageDTO } from "@/features/common/dtos"
import { ImageResponse } from "@/features/common/repo"
import { OfferDetailsSectionResponse } from "@/features/offer-details/logic/offer-details-repo"
import { OfferDetailsSectionDTO } from "@/features/offer-details/logic/offer-details-type"
import { OfferListResponse } from "@/features/offer-list/logic/offer-list-repo"
import { OfferDTO } from "@/features/offer-list/logic/offer-list-type"
import {
  ProductComponentDetailsDTO,
  ProductComponentSelectOptionDTO,
  ProductDTO,
  ProductListContentResponse,
  ProductListDetailsResponse,
  ProductListSelectOptionResponse,
  ProductResponse,
} from "@/features/product-list/logic/product-list-repo"
import { match } from "ts-pattern"

function randomInt(min: number = 10, max: number = 20): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomBool() {
  return randomInt(1, 2) === 1
}

function randomString(length: number = randomInt()): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }
  return result
}

const height = randomInt()
const width = randomInt()
const AWS_MEDIA_URL = process.env.AWS_MEDIA_URL

export function imageDTOSample(response?: ImageResponse) {
  if (!response) return undefined

  return {
    height: response.height,
    width: response.width,
    alt: response.alternativeText,
    url: response.url,
  } satisfies ImageDTO
}

export function imageResponseSample(text: string = randomString()) {
  return {
    alternativeText: "alt " + text,
    height: height,
    width: width,
    url: `${AWS_MEDIA_URL}uploads/${text}.jpg`,
  } satisfies ImageResponse
}

// Offer DTO
export function offerDetailsSectionDTOSample(response: OfferDetailsSectionResponse) {
  return {
    ...response,
    image: imageDTOSample(response.image)!,
  } satisfies OfferDetailsSectionDTO
}

export function offerListDTOSample(response: OfferListResponse) {
  return response.offers.map(
    ({ description, id, image, offerId, subtitle, title }) =>
      ({
        description,
        id,
        offerId,
        subtitle,
        title,
        image: imageDTOSample(image)!,
      }) satisfies OfferDTO,
  )
}

// Offer Response

export function offerDetailsSectionResponseSample(title: string) {
  return {
    title,
    subtitle: title + " subtitle",
    description: title + " Lorem Ipsum is simply dummy text",
    image: imageResponseSample(title + " image"),
  } satisfies OfferDetailsSectionResponse
}

export const offerListResposneSample = {
  offers: [
    {
      id: 1,
      offerId: "mma",
      description: "desc 1",
      title: "title 1",
      subtitle: "subtitle 1",
      image: imageResponseSample("mma"),
    },
  ],
} satisfies OfferListResponse

// Product Response

export function productListResponseSample() {
  const makeContent = () => {
    const option = {
      __typename: "ComponentProductProductOption",
      ...productListSelectOptionResponseSample,
    } satisfies ProductListContentResponse
    const details = {
      ...productListDetailsResponseSample(),
      __typename: "ComponentProductProductDetails",
    } satisfies ProductListContentResponse
    return randomBool() ? option : details
  }

  return {
    products: [randomString(), randomString()].map(
      val =>
        ({
          documentId: randomString(),
          title: "title " + val,
          note: randomBool() ? "note " + val : undefined,
          content: [makeContent(), makeContent()],
        }) satisfies ProductResponse,
    ),
  }
}

export const productListSelectOptionResponseSample: ProductListSelectOptionResponse = {
  id: randomString(),
  placeholder: randomString(),
  details: [productListDetailsResponseSample(), productListDetailsResponseSample()],
}

export function productListDetailsResponseSample(): ProductListDetailsResponse {
  return {
    id: randomString(),
    price: randomInt(),
    description: randomString(),
    image: imageResponseSample(),
    name: randomString(),
  } satisfies ProductListDetailsResponse
}

// Product DTO

export function productDTOSample(response: { products: ProductResponse[] }) {
  const makeContent = (val: ProductListContentResponse) =>
    match(val)
      .with({ __typename: "ComponentProductProductOption" }, productComponentSelectOptionDTOSample)
      .with({ __typename: "ComponentProductProductDetails" }, productComponentDetailsDTOSample)
      .exhaustive()

  return response.products.map(
    ({ documentId, title, note, content }) =>
      ({
        id: documentId,
        title,
        note,
        content: content.map(makeContent),
      }) satisfies ProductDTO,
  )
}

export function productComponentDetailsDTOSample(response: ProductListDetailsResponse) {
  return {
    component: "product-details",
    id: response.id,
    price: response.price,
    description: response.description,
    image: imageDTOSample(response.image),
  } satisfies ProductComponentDetailsDTO
}

export function productComponentSelectOptionDTOSample(response: ProductListSelectOptionResponse) {
  return {
    component: "product-select-option",
    id: response.id,
    placeholder: response.placeholder,
    options: response.details.map(productComponentDetailsDTOSample),
  } satisfies ProductComponentSelectOptionDTO
}
