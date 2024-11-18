import { ApolloClient, InMemoryCache, createHttpLink, gql } from "@apollo/client"

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

export default client

export { gql }
