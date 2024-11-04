export type ImageResponse = {
  alternativeText: string
  width: number
  height: number
  mime: string
  url: string
  previewUrl?: string
}

export function cmsImageDTO(image?: ImageResponse): ImageResponse | undefined {
  const CMS_BASE_URL = process.env.CMS_BASE_URL

  if (image) {
    return {
      ...image,
      url: `${CMS_BASE_URL}${image.url}`,
      previewUrl: image.previewUrl ? `${CMS_BASE_URL}${image.previewUrl}` : undefined,
    }
  }
  return undefined
}
