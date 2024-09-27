const typeDefs = `

type User {
  _id: ID!
  username: String!
  email: String!
  orders: [Order]
  favorites: [Sneaker]
}

type Order {
  _id: ID!
  orderDate: String!
  items: [OrderItem]!
  total: Float!
  shippingAddress: ShippingAddress!
  status: String!
}

type OrderItem {
  sneaker: Sneaker
  size: Float!
  quantity: Int!
  price: Float!
}

type ShippingAddress {
  fullName: String!
  address: String!
  city: String!
  state: String!
  zipCode: String!
}

input OrderInput {
  items: [OrderItemInput]!
  total: Float!
  shippingAddress: ShippingAddressInput!
}

input OrderItemInput {
  sneakerId: ID!
  size: Float!
  quantity: Int!
  price: Float!
}

input ShippingAddressInput {
  fullName: String!
  address: String!
  city: String!
  state: String!
  zipCode: String!
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

type Category {
  _id: ID!
  name: String!
}

type Query {
  users: [User]
  user(username: String!): User
  me: User
  recommendedSneakers: [Sneaker]
  autumnSneakers: [Sneaker]
  popularSneakers: [Sneaker]
  categories: [Category]
  latestPicks: [Sneaker]
  allSneakers: [Sneaker]
  sneaker(id: ID!): Sneaker
  orders: [Order]
  userOrders: [Order]
  sneakerCount: Int
  totalSales: Float!
  allOrders: OrdersResponse!
  getAnalytics: Analytics!
}

type Auth {
  token: ID
  user: User
}

type PaymentIntentResponse {
    clientSecret: String!
  }

input SneakerInput {
  brand: String!
  model: String!
  name: String!
  gender: String!
  sizes: [SizeQuantityInput]!
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

input SizeQuantityInput {
  size: Float!
  quantity: Int!
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  createPaymentIntent(amount: Int!): PaymentIntentResponse!
  addOrder(input: OrderInput!): Order
  addToFavorites(sneakerId: ID!): User
  removeFromFavorites(sneakerId: ID!): User
  updateSneaker(id: ID!, input: SneakerInput!): Sneaker
  createSneaker(input: SneakerInput!): Sneaker
  deleteSneaker(id: ID!): Sneaker
}

type OrdersResponse {
  orders: [Order]!
  processingOrdersCount: Int!
}

type Analytics {
  activeUsers: Int!
  pageViews: Int!
  averageSessionDuration: Float!
  topProducts: [Sneaker]!
}

`;

module.exports = typeDefs