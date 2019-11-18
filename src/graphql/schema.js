var { buildSchema } = require("graphql");

var schema = buildSchema(`
type Product {
    id: Int!,
    name: String!,
    price:Float!,
    image: String!
}
type Order {
    id: Int!,
    orderNumber: String!,
}
 type Query {
    searchProducts(name: String): [Product!]!,
    products(name: String): [Product!]!
  }
  type Mutation {
    insertOrder: Order
  }
`);

module.exports = schema;
