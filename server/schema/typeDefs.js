const typeDefs = `

type User {
  _id: ID!
  username: String!
  email: String!
}

type Sneaker {
  _id: ID!
  brand: String!
  model: String!
  name: String!
  gender: String!
  sizes: [SizeQuantity]!
  price: Float!
  description: String
  imageUrl: String
  category: String
  releaseDate: String
  recommended: Boolean
  onSale: Boolean
  salePrice: Float
  autumn: Boolean
}

type SizeQuantity {
  size: Float!
  quantity: Int!
}

type Query {
  users: [User]
  user(username: String!): User
  me: User
  recommendedSneakers: [Sneaker]
  autumnSneakers: [Sneaker]
}

type Auth {
  token: ID
  user: User
}

type PaymentIntentResponse {
    clientSecret: String!
  }

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  createPaymentIntent(amount: Int!): PaymentIntentResponse!
}
`;

module.exports = typeDefs