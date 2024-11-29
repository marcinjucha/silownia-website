import { ImageDTO } from "@/features/common/common-dtos"
import { ImageResponse, optionalImageDTO } from "@/features/common/common-repos"
import client, { gql } from "@/lib/graph-ql/client"
import { IMAGE_FIELDS } from "@/lib/graph-ql/fragment-defs"
import { handleGraphQLQuery } from "@/lib/graph-ql/graphql-utils"
import { match } from "ts-pattern"

export type ProductDTO = {
  id: string
  title: string
  note?: string
  content: ProductComponentSelectOptionDTO | ProductComponentDetailsDTO
}

export type ProductComponentSelectOptionDTO = {
  component: "product-select-option"
  id: string
  placeholder: string
  options: ProductComponentDetailsDTO[]
}

export type ProductComponentDetailsDTO = {
  component: "product-details"
  id: string
  name?: string
  description?: string
  price: number
  image?: ImageDTO
}

export type ProductResponse = {
  documentId: string
  title: string
  note?: string
  content: ProductListContentResponse[]
}

export type ProductListContentResponse =
  | ({
      __typename: "ComponentProductProductOption"
    } & ProductListSelectOptionResponse)
  | ({
      __typename: "ComponentProductProductDetails"
    } & ProductListDetailsResponse)

export type ProductListDetailsResponse = {
  id: string
  name?: string
  description?: string
  price: number
  image?: ImageResponse
}

export type ProductListSelectOptionResponse = {
  id: string
  placeholder: string
  details: ProductListDetailsResponse[]
}

const query = gql`
  query Products($sort: [String]) {
    products(sort: $sort) {
      documentId
      title
      note
      content {
        ... on ComponentProductProductDetails {
          id
          name
          description
          price
          image {
            ...ImageFields
          }
        }
        ... on ComponentProductProductOption {
          id
          placeholder
          details {
            id
            name
            description
            price
            image {
              ...ImageFields
            }
          }
        }
      }
    }
  }

  ${IMAGE_FIELDS}
`

export async function fetchProductListFromCMS(): Promise<ProductDTO[]> {
  const response = await client.query<{ products: ProductResponse[] }>({
    query,
    variables: {
      sort: ["updatedAt:desc"],
    },
  })
  const data = handleGraphQLQuery(response)

  const result = data.products.map(item => {
    let dto: ProductDTO = {
      id: item.documentId,
      title: item.title,
      note: item.note,
      content: item.content.map(makeProductContentDTO)[0],
    }

    return dto
  })

  return result
}

function makeProductContentDTO(content: ProductListContentResponse) {
  return match(content)
    .with(
      { __typename: "ComponentProductProductOption" },
      content =>
        ({
          component: "product-select-option",
          id: content.id,
          placeholder: content.placeholder,
          options: content.details.map(item => ({
            id: item.id,
            price: item.price,
            description: item.description,
            name: item.name,
            component: "product-details",
            image: optionalImageDTO(item.image),
          })),
        }) satisfies ProductComponentSelectOptionDTO,
    )
    .with(
      { __typename: "ComponentProductProductDetails" },
      content =>
        ({
          id: content.id,
          price: content.price,
          description: content.description,
          name: content.name,
          component: "product-details",
          image: optionalImageDTO(content.image),
        }) satisfies ProductComponentDetailsDTO,
    )
    .exhaustive()
}
