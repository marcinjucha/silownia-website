import { ApolloClient, InMemoryCache, createHttpLink, gql } from "@apollo/client"
import { GraphQLFormattedError } from "graphql"

const API_KEY = process.env.CMS_API_KEY

const httpLink = createHttpLink({
  uri: `${process.env.CMS_BASE_URL}/graphql`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

class GraphQLError extends Error {
  constructor(errors: GraphQLFormattedError[]) {
    super(errors.map(err => err.message).join("\n"))
  }
}

export default client

export { gql, GraphQLError }
