import { GraphQLError } from "@/lib/graph-ql/client"
import { unwrapData } from "@/lib/utils"
import { ApolloQueryResult, FetchResult } from "@apollo/client"

export function handleGraphQLMutation<T>(result: FetchResult<T>): NonNullable<T> {
  const { data, errors } = result
  if (errors) {
    throw new GraphQLError([...errors])
  }

  return unwrapData(data)
}

export function handleGraphQLQuery<T>(result: ApolloQueryResult<T>): T {
  const { data, errors } = result
  if (errors) {
    throw new GraphQLError([...errors])
  }

  return data
}
