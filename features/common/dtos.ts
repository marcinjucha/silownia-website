export type ImageDTO = {
  alternativeText: string
  width: number
  height: number
  mime: string
  url: string
  previewUrl?: string
}

export type OfferDTO = {
  id: number
  offerId: string
  title: string
  subtitle: string
  description: string
  image: ImageDTO
  offerDetails: OfferDetailsDTO
}

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
