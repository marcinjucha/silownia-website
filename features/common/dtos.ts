export type ImageDTO = {
  alt: string
  width: number
  height: number
  url: string
  formats?: ImageFormatsDTO
}

export type ImageFormatKey = "large" | "medium" | "small" | "thumbnail"

export type ImageFormatsDTO = Record<ImageFormatKey, ImageFormatDTO | undefined>

export type ImageFormatDTO = {
  url: string
  width: number
  height: number
}
