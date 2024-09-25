import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($amount: Int!) {
    createPaymentIntent(amount: $amount) {
      clientSecret
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($input: OrderInput!) {
    addOrder(input: $input) {
      _id
      orderDate
      total
      status
      items {
        sneaker {
          _id
          name
          imageUrl
        }
        size
        quantity
        price
      }
      shippingAddress {
        fullName
        address
        city
        state
        zipCode
      }
    }
  }
`;

export const ADD_TO_FAVORITES = gql`
  mutation addToFavorites($sneakerId: ID!) {
    addToFavorites(sneakerId: $sneakerId) {
      _id
      username
      favorites {
        _id
      }
    }
  }
`;

export const REMOVE_FROM_FAVORITES = gql`
  mutation removeFromFavorites($sneakerId: ID!) {
    removeFromFavorites(sneakerId: $sneakerId) {
      _id
      username
      favorites {
        _id
      }
    }
  }
`;


