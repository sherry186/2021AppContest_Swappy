import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

  const URI = 'http://f0792a8b48ff.ngrok.io';

  export const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache()
  });