import {
  ImageControl,
  ImageControlFields,
  ImageControlDTO,
  ImageProps,
  mapToImageProps,
} from "@/components/controls/image"
import TextControl, {
  TextControlFields,
  TextControlDTO,
  TextProps,
  mapToTextProps,
} from "@/components/controls/text"
import { gql } from "@apollo/client"
import { cn } from "@/lib/utils"
import { Card } from "./ui/card"

export const ArticleCardFields = gql`
  fragment ArticleCardFields on ComponentComponentsArticleCard {
    __typename
    image {
      ...ImageControlFields
    }
    title {
      ...TextControlFields
    }
    text {
      ...TextControlFields
    }
  }
  ${ImageControlFields}
  ${TextControlFields}
`

export type ArticleCardComponentDTO = {
  image: ImageControlDTO
  title: TextControlDTO
  text: TextControlDTO
}

export type ArticleCardProps = {
  image: ImageProps
  title: TextProps
  text: TextProps
  className?: string
  reversed?: boolean
}

export function mapToArticleCardProps(
  dto: ArticleCardComponentDTO,
): Omit<ArticleCardProps, "className"> {
  return {
    image: mapToImageProps(dto.image),
    title: mapToTextProps(dto.title),
    text: mapToTextProps(dto.text),
  }
}

export default function ArticleCard({
  image,
  title,
  text,
  className,
  reversed = false,
}: ArticleCardProps) {
  return (
    <>
      <Card
        className={cn("bg-card hover:bg-card/80 gap-2 p-6 shadow-md transition-colors", className)}
      >
        <div
          className={cn(
            "flex flex-col items-center gap-8 px-2 py-4",
            reversed ? "sm:flex-row-reverse" : "sm:flex-row",
          )}
        >
          <div className="aspect-2/3 h-auto object-cover sm:aspect-square sm:w-1/3">
            <ImageControl {...image} />
          </div>
          <div className="flex w-full flex-col gap-4 sm:w-2/3">
            <TextControl {...title} />
            <TextControl {...text} />
          </div>
        </div>
      </Card>
    </>
  )
}
