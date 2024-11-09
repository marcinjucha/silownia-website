import { ImageDTO } from "@/features/common/dtos"
import { OfferDetailsDTO } from "@/features/offer-details/logic/offer-details-type"

export type OfferDTO = {
  id: number
  offerId: string
  title: string
  subtitle: string
  description: string
  image: ImageDTO
  offerDetails: OfferDetailsDTO
}
