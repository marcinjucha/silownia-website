import { cmsImageDTO, ImageDTO, ImageResponse } from "@/repos/common-repo"

export type OfferDetailsDTO = {
  id: string
  sections: {
    title: string
    subtitle?: string
    description: string
    image: ImageDTO
  }[]
  imageGallery: ImageDTO[]
}

export type OfferDetailsResponse = {
  data: {
    id: string
    sections: {
      title: string
      subtitle?: string
      description: string
      image: ImageResponse
    }[]
  }
  images: ImageResponse[]
}

const CMS_BASE_URL = process.env.CMS_BASE_URL
const CMS_API_KEY = process.env.CMS_API_KEY

export async function fetchOfferDetailsFromCMS(id: string) {
  const response = await fetch(`${CMS_BASE_URL}/api/offer-details/${id}?populate=*`, {
    headers: {
      Authorization: `Bearer ${CMS_API_KEY}`,
    },
  })
  const json = (await response.json()) as OfferDetailsResponse

  const result: OfferDetailsDTO = {
    id: json.data.id,
    sections: json.data.sections.map(item => ({
      ...item,
      image: cmsImageDTO(item.image)!,
    })),
    imageGallery: json.images.map(img => cmsImageDTO(img)!),
  }

  return result
}
