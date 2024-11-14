import { ImageDTO } from "@/features/common/dtos"

export type ImageResponse = {
  alternativeText: string
  width: number
  height: number
  url: string
  previewUrl?: string
}

export function cmsImageDTO(image?: ImageResponse): ImageDTO | undefined {
  if (image) {
    return {
      height: image.height,
      width: image.width,
      alt: image.alternativeText,
      url: image.url,
      previewUrl: image.previewUrl,
    }
  }
  return undefined
}
