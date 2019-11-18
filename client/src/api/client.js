import ApolloClient, { gql } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

import { resolvers } from "./resolvers";
/*
const typeDefs = gql`
  extend type Query {
    getCart: [Product]!
  }
  extend type Product {
    id: Int
    name: String
    price: Float
    image: String
    quantity: Int
  }
  extend type Mutation {
    addToCart(product: Product!): [Product]
  }
`;*/

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      cartItem: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: "Product ", id: args.id })
    }
  }
});
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  resolvers: resolvers
});

export default client;
