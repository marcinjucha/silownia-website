import { ImageDTO } from "@/features/common/common-dtos"

export type OfferDetailsDTO = {
  offerImage: ImageDTO
  imageGallery: ImageDTO[]
  sections: OfferDetailsSectionDTO[]
}

export type OfferDetailsSectionDTO = {
  title: string
  subtitle: string
  description: string
  image: ImageDTO
}
