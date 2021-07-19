import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

  const URI = 'http://434c59d8aafb.ngrok.io';

  export const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache()
  });