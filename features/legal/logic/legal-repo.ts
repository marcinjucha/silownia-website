import client from "@/lib/graph-ql/client"
import { handleGraphQLQuery } from "@/lib/graph-ql/graphql-utils"
import { gql } from "@apollo/client"
import { LegalDTO } from "./legal-type"
import { RichTextControlContentDTO } from "@/components/controls/rich-text-repo"

const legalQuery = gql`
  query Query($filters: LegalContentFiltersInput) {
    legalContents(filters: $filters) {
      title
      description
      content
    }
  }
`

export type LegalResponse = {
  title: string
  description?: string
  content: RichTextControlContentDTO
}

export async function fetchRegulaminFromCMS(): Promise<LegalDTO> {
  const result = await client.query<{ legalContents: LegalResponse[] }>({
    query: legalQuery,
    variables: {
      filters: {
        legalID: {
          eq: "regulamin",
        },
      },
    },
  })

  const data = handleGraphQLQuery(result).legalContents[0]

  return {
    title: data.title,
    description: data.description,
    content: data.content,
  } satisfies LegalDTO
}

export async function fetchPrivacyTermsFromCMS(): Promise<LegalDTO> {
  const result = await client.query<{ legalContents: LegalResponse[] }>({
    query: legalQuery,
    variables: {
      filters: {
        legalID: {
          eq: "polityka",
        },
      },
    },
  })

  const data = handleGraphQLQuery(result).legalContents[0]

  return {
    title: data.title,
    description: data.description,
    content: data.content,
  } satisfies LegalDTO
}
