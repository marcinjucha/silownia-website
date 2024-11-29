import { ImageDTO, ImageFormatKey, ImageFormatsDTO } from "@/features/common/common-dtos"

export type ImageResponse = {
  alternativeText: string
  width: number
  height: number
  url: string
  formats?: ImageFormatsResponse
}

export type ImageFormatsResponse = Record<ImageFormatKey, ImageFormatResponse | undefined>

export type ImageFormatResponse = {
  url: string
  width: number
  height: number
}

export function optionalImageDTO(image?: ImageResponse): ImageDTO | undefined {
  if (image) {
    return imageDTO(image)
  }

  return undefined
}

const baseURL = process.env.NODE_ENV === "production" ? "" : process.env.CMS_BASE_URL || ""

export function imageDTO(image: ImageResponse): ImageDTO {
  return {
    height: image.height,
    width: image.width,
    alt: image.alternativeText,
    url: `${baseURL}${image.url}`,
    formats: imageFormatsDTO(image.formats),
  }
}

export function imageFormatsDTO(formats?: ImageFormatsResponse): ImageFormatsDTO | undefined {
  if (!formats) return undefined

  const keys: ImageFormatKey[] = Object.keys(formats) as (keyof ImageFormatsResponse)[]

  const result: ImageFormatsDTO = {
    large: undefined,
    medium: undefined,
    small: undefined,
    thumbnail: undefined,
  }

  keys.forEach(key => {
    if (formats[key]) {
      const format = formats[key]
      result[key] = {
        height: format.height,
        url: `${baseURL}${format.url}`,
        width: format.width,
      }
    }
  })

  return result
}
