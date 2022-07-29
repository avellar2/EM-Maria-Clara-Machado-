import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.hygraph.com/v2/cl5vsid2v0h7t01t7ec1bcyfw/master',
  cache: new InMemoryCache(),
})
