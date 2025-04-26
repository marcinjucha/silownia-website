import { ImageControlDTO } from "@/components/controls/image"
import { TextControlDTO } from "@/components/controls/text"
import { ImageDTO } from "@/features/common/common-dtos"

export type OfferDetailsDTO = {
  offerImage: ImageDTO
  imageGallery: ImageDTO[]
  sections: OfferDetailsSectionDTO[]
  trainersTitle: TextControlDTO
  trainers: OfferDetailsTrainerDTO[]
}

export type OfferDetailsSectionDTO = {
  title: string
  subtitle: string
  description: string
  image: ImageDTO
}

export type OfferDetailsTrainerDTO = {
  title: TextControlDTO
  description: TextControlDTO
  image: ImageControlDTO
}
