import { ImageDTO, OfferDetailsSectionDTO, OfferDTO } from "@/features/common/dtos"
import { ImageResponse } from "@/features/common/repo"
import {
  OfferDetailsSectionResponse,
  OfferListResponse,
} from "@/features/offer-list/logic/offer-list-repo"
import {
  ProductComponentDetailsDTO,
  ProductComponentSelectOptionDTO,
  ProductDTO,
  ProductListContentResponse,
  ProductListDetailsResponse,
  ProductListResponse,
  ProductListSelectOptionResponse,
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
const usePreview = randomBool()
const CMS_BASE_URL = process.env.CMS_BASE_URL

export function imageDTOSample(response?: ImageResponse) {
  if (!response) return undefined

  return {
    height: response.height,
    width: response.width,
    altText: response.alternativeText,
    url: `${CMS_BASE_URL}${response.url}`,
    previewUrl: response.previewUrl ? `${CMS_BASE_URL}${response.previewUrl}` : response.previewUrl,
  } satisfies ImageDTO
}

export function imageResponseSample(text: string = randomString()) {
  return {
    alternativeText: "alt " + text,
    height: height,
    width: width,
    url: `/uploads/${text}.jpg`,
    previewUrl: usePreview ? `/uploads/preview-${text}.jpg` : undefined,
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
  return response.data.map(
    ({ description, id, image, offerDetails, offerId, subtitle, title }) =>
      ({
        description,
        id,
        offerId,
        subtitle,
        title,
        offerDetails: {
          sections: offerDetails.sections.map(offerDetailsSectionDTOSample),
          imageGallery: offerDetails.imageGallery.map(img => imageDTOSample(img)!),
        },
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
  data: [
    {
      id: 1,
      offerId: "mma",
      description: "desc 1",
      title: "title 1",
      subtitle: "subtitle 1",
      image: imageResponseSample("mma"),
      offerDetails: {
        sections: [
          offerDetailsSectionResponseSample("Beginner mma"),
          offerDetailsSectionResponseSample("Advanced mma"),
          offerDetailsSectionResponseSample("Meet mma"),
        ],
        imageGallery: [imageResponseSample("mma gal 1"), imageResponseSample("mma gal 2")],
      },
    },
  ],
} satisfies OfferListResponse

// Product Response

export function productListResponseSample() {
  const makeContent = () => {
    const option = {
      __component: "product.product-option",
      ...productListSelectOptionResponseSample,
    } satisfies ProductListContentResponse
    const details = {
      ...productListDetailsResponseSample(),
      __component: "product.product-details",
    } satisfies ProductListContentResponse
    return randomBool() ? option : details
  }

  return {
    data: [randomString(), randomString()].map(val => ({
      id: randomInt(),
      title: "title " + val,
      note: randomBool() ? "note " + val : undefined,
      content: [makeContent(), makeContent()],
    })),
  } satisfies ProductListResponse
}

export const productListSelectOptionResponseSample: ProductListSelectOptionResponse = {
  placeholder: randomString(),
  details: [productListDetailsResponseSample(), productListDetailsResponseSample()],
}

export function productListDetailsResponseSample(): ProductListDetailsResponse {
  return {
    id: randomInt(),
    price: randomInt(),
    description: randomString(),
    image: imageResponseSample(),
    name: randomString(),
  } satisfies ProductListDetailsResponse
}

// Product DTO

export function productDTOSample(response: ProductListResponse) {
  const makeContent = (val: ProductListContentResponse) =>
    match(val)
      .with({ __component: "product.product-option" }, productComponentSelectOptionDTOSample)
      .with({ __component: "product.product-details" }, productComponentDetailsDTOSample)
      .exhaustive()

  return response.data.map(
    ({ id, title, note, content }) =>
      ({
        id,
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
    placeholder: response.placeholder,
    options: response.details.map(productComponentDetailsDTOSample),
  } satisfies ProductComponentSelectOptionDTO
}
