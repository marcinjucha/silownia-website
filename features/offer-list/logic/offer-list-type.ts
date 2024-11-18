import { ImageDTO } from "@/features/common/dtos"

export type OfferDTO = {
  id: number
  offerId: string
  title: string
  subtitle: string
  description: string
  image: ImageDTO
}
