import { gql } from "@apollo/client"

export const IMAGE_FIELDS = gql`
  fragment ImageFields on UploadFile {
    url
    height
    width
    alternativeText
    formats
  }
`
