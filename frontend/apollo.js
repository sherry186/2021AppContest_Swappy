import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

  const URI = 'http://cc5d128b60e4.ngrok.io';

  export const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache()
  });