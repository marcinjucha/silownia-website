import { GraphQLFormattedError } from "graphql"
import { DocumentNode } from "@apollo/client"

class GraphQLError extends Error {
  constructor(errors: GraphQLFormattedError[]) {
    super(errors.map(err => err.message).join("\n"))
  }
}

// Helper do konwersji gql DocumentNode → string
function queryToString(query: DocumentNode | string): string {
  if (typeof query === "string") return query
  return query.loc?.source.body || ""
}

async function graphqlFetch<T>(
  query: DocumentNode | string,
  variables?: Record<string, any>,
): Promise<T> {
  const response = await fetch(`${process.env.CMS_BASE_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CMS_API_KEY}`,
    },
    body: JSON.stringify({
      query: queryToString(query),
      variables,
    }),
    // DISABLE_CACHE support - backup (głównie cacheComponents w next.config)
    cache: process.env.DISABLE_CACHE === "true" ? "no-store" : "default",
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`)
  }

  const { data, errors } = await response.json()

  if (errors && errors.length > 0) {
    throw new GraphQLError(errors)
  }

  return data
}

export { graphqlFetch, GraphQLError }
