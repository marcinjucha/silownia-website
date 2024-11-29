import { ImageDTO } from "@/features/common/common-dtos"

export type OfferDetailsDTO = {
  imageGallery: ImageDTO[]
  sections: OfferDetailsSectionDTO[]
}

export type OfferDetailsSectionDTO = {
  title: string
  subtitle: string
  description: string
  image: ImageDTO
}
