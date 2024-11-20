import { ImageDTO } from "@/features/common/dtos"

export type HomeOfferDTO = {
  id: number
  offerId: string
  title: string
  image: ImageDTO
}
