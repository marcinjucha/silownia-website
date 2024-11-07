import { cmsImageDTO, ImageResponse } from "@/features/common/repo"
import { OfferDTO } from "@/features/common/dtos"

export type OfferListResponse = {
  data: OfferResponse[]
}

export type OfferResponse = {
  id: number
  offerId: string
  title: string
  subtitle: string
  description: string
  image: ImageResponse
  offerDetails: OfferDetailsResponse
}

export type OfferDetailsResponse = {
  imageGallery: ImageResponse[]
  sections: OfferDetailsSectionResponse[]
}

export type OfferDetailsSectionResponse = {
  title: string
  subtitle: string
  description: string
  image: ImageResponse
}

export async function fetchOfferListFromCMS() {
  const URL = process.env.CMS_BASE_URL
  const API_KEY = process.env.CMS_API_KEY

  const response = await fetch(
    `${URL}/api/offers?populate[0]=image&populate[1]=offerDetails.sections.image&populate[2]=offerDetails.imageGallery`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  )
  const json = (await response.json()) as OfferListResponse

  const result: OfferDTO[] = json.data.map(
    offer =>
      ({
        ...offer,
        image: cmsImageDTO(offer.image)!,
        offerDetails: {
          sections: offer.offerDetails.sections.map(section => ({
            ...section,
            image: cmsImageDTO(section.image)!,
          })),
          imageGallery: offer.offerDetails.imageGallery.map(img => cmsImageDTO(img)!),
        },
      }) satisfies OfferDTO,
  )

  return result
}
