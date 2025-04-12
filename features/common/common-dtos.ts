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

export type APIResponseStatusDTO = {
  statusCode: number
  message: string
}

export type UploadFileDTO = {
  name: string
  extension: string
  mimeType: string
  fileSize: number
  downloadUrl: string
}
