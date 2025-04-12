export type SEOOpenGraphType = "website"

export type SEOImage = {
  url: string
  width: number
  height: number
  alt: string
}

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
    image: SEOImage
  }
}
