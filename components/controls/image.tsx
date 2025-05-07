import { gql } from "@apollo/client"
import Image from "next/image"
import { makeImageUrl } from "@/features/common/common-repos"

export const ImageControlFields = gql`
  fragment ImageControlFields on ComponentControlsImage {
    __typename
    alt
    imageFormat
    image {
      url
      height
      width
      formats
    }
  }
`

export type ImageControlDTO = {
  alt: string
  imageFormat: ImageFormat
  image: {
    url: string
    height: number
    width: number
    formats?: ImageFormatsDTO
  }
}

export type ImageFormatsDTO = Record<ImageFormat, ImageFormatDTO | undefined>

export type ImageFormatDTO = {
  url: string
  width: number
  height: number
}

export type ImageFormat = "large" | "medium" | "small" | "thumbnail"

export type ImageProps = {
  alt: string
  imageFormat: ImageFormat
  image: {
    url: string
    height: number
    width: number
    formats?: Partial<ImageFormatsDTO>
  }
}

export function mapToImageProps(dto: ImageControlDTO): ImageProps {
  return { ...dto }
}

export function ImageControl({ alt, imageFormat, image }: ImageProps) {
  const selectedFormat = image.formats?.[imageFormat]
  const imageUrl = makeImageUrl(selectedFormat?.url || image.url)
  const width = selectedFormat?.width || image.width
  const height = selectedFormat?.height || image.height

  return <Image src={imageUrl} alt={alt} width={width} height={height} className="object-contain" />
}

export default ImageControl
