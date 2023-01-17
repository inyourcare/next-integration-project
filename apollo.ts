import { ApolloClient, InMemoryCache } from "@apollo/client";

const apollo = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

export default apollo;
