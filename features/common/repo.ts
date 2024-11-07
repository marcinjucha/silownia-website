import { ImageDTO } from "@/features/common/dtos"

export type ImageResponse = {
  alternativeText: string
  width: number
  height: number
  url: string
  previewUrl?: string
}

export function cmsImageDTO(image?: ImageResponse): ImageDTO | undefined {
  const CMS_BASE_URL = process.env.CMS_BASE_URL

  if (image) {
    return {
      height: image.height,
      width: image.width,
      altText: image.alternativeText,
      url: `${CMS_BASE_URL}${image.url}`,
      previewUrl: image.previewUrl ? `${CMS_BASE_URL}${image.previewUrl}` : undefined,
    }
  }
  return undefined
}
