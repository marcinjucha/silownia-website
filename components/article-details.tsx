import { gql } from "@apollo/client"
import { RichTextControlFields } from "./controls/rich-text-repo"
import { RichTextControlDTO } from "./controls/rich-text-repo"
import RichTextControl, { mapToRichTextProps, RichTextProps } from "./controls/rich-text"
import ArticleCard, {
  mapToArticleCardProps,
  ArticleCardComponentDTO,
  ArticleCardFields,
  ArticleCardProps,
} from "@/components/article-card"

export const ArticleDetailsFields = gql`
  fragment ArticleDetailsFields on ComponentComponentsArticleDescription {
    __typename
    header {
      ...ArticleCardFields
    }
    content {
      ...RichTextControlFields
    }
  }
  ${ArticleCardFields}
  ${RichTextControlFields}
`

export type ArticleDetailsComponentDTO = {
  header: ArticleCardComponentDTO
  content: RichTextControlDTO
}

export type ArticleDetailsProps = {
  header: ArticleCardProps
  content: RichTextProps
  className?: string
  reversed?: boolean
}

export function mapToArticleDetailsProps(
  dto: ArticleDetailsComponentDTO,
): Omit<ArticleDetailsProps, "className"> {
  return {
    header: mapToArticleCardProps(dto.header),
    content: mapToRichTextProps(dto.content),
  }
}

export default function ArticleDetails({
  header,
  content,
  className,
  reversed = false,
}: ArticleDetailsProps) {
  return (
    <>
      <ArticleCard {...header} className={className} reversed={reversed} />
      <div className="mx-auto mt-6 p-2 sm:p-6">
        <RichTextControl {...content} />
      </div>
    </>
  )
}
