import { ImageDTO, ImageFormatKey, ImageFormatsDTO } from "@/features/common/common-dtos"
import { gql } from "@apollo/client"
import { NextResponse } from "next/server"
import { match } from "ts-pattern"

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

export function imageDTO(image: ImageResponse): ImageDTO {
  return {
    height: image.height,
    width: image.width,
    alt: image.alternativeText,
    url: makeImageUrl(image.url),
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
        url: makeImageUrl(format.url),
        width: format.width,
      }
    }
  })

  return result
}

export const UploadFileFields = gql`
  fragment UploadFileFields on UploadFile {
    name
    ext
    mime
    size
    url
  }
`

export function makeImageUrl(url: string) {
  const baseURL =
    url.includes("http://") || url.includes("https://") ? "" : process.env.CMS_BASE_URL || ""

  return `${baseURL}${url}`
}

export function makeAssetUrl(url: string) {
  const baseURL =
    url.includes("http://") || url.includes("https://") ? "" : process.env.CMS_BASE_URL || ""

  return `${baseURL}${url}`
}

export function createAPIResponse(statusCode: number, message?: string) {
  const response = match(statusCode)
    .when(
      val => val === 200,
      () => NextResponse.json({ message: message || "OK" }, { status: 200 }),
    )
    .when(
      val => val === 500,
      () => NextResponse.json({ error: message || "Internal server error" }, { status: 500 }),
    )
    .when(
      val => val === 400,
      () => NextResponse.json({ error: message || "Invalid request" }, { status: 400 }),
    )
    .when(
      val => val === 404,
      () => NextResponse.json({ error: message || "Not found" }, { status: 404 }),
    )
    .otherwise(() => NextResponse.json({ error: message || "Unknown error" }, { status: 500 }))

  console.error("API error response", response)
  return response
}
