const typeDefs = `

type User {
  _id: ID!
  username: String!
  email: String!
}


type Query {
  users: [User]
  user(username: String!): User
  me: User
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