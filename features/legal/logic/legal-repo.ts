import { cacheLife, cacheTag } from "next/cache"
import { gql } from "@apollo/client"
import { graphqlFetch } from "@/lib/graph-ql/fetch-client"
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
  "use cache"
  cacheLife("days") // 24h
  cacheTag("legal")
  cacheTag("regulamin")

  const result = await graphqlFetch<{ legalContents: LegalResponse[] }>(legalQuery, {
    filters: {
      legalID: {
        eq: "regulamin",
      },
    },
  })

  const data = result.legalContents[0]

  return {
    title: data.title,
    description: data.description,
    content: data.content,
  } satisfies LegalDTO
}

export async function fetchPrivacyTermsFromCMS(): Promise<LegalDTO> {
  "use cache"
  cacheLife("days") // 24h
  cacheTag("legal")
  cacheTag("privacy")

  const result = await graphqlFetch<{ legalContents: LegalResponse[] }>(legalQuery, {
    filters: {
      legalID: {
        eq: "polityka",
      },
    },
  })

  const data = result.legalContents[0]

  return {
    title: data.title,
    description: data.description,
    content: data.content,
  } satisfies LegalDTO
}
