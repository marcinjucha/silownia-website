import { ImageDTO } from "@/features/common/common-dtos"

export type SEOOpenGraphType = "website"

export type SEOMetadataDTO = {
  title: string
  description: string
  keywords: string
  canonical: string
  openGraph: {
    title: string
    description: string
    type: SEOOpenGraphType
    url: string
    image: ImageDTO
  }
}
