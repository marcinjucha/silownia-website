import { gql } from "@apollo/client"
import { type BlocksContent } from "@strapi/blocks-react-renderer"

export const RichTextControlFields = gql`
  fragment RichTextControlFields on ComponentControlsRichText {
    __typename
    text
  }
`

export type RichTextControlDTO = {
  text: RichTextControlContentDTO
}

export type RichTextControlContentDTO = BlocksContent
