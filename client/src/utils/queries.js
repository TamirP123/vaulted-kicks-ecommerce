import { gql }  from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_USERS = gql`
  query getUsers{
    users {
        username
        email
      }
  }
`;

export const QUERY_RECOMMENDED_SNEAKERS = gql`
  query getRecommendedSneakers {
    recommendedSneakers {
      _id
      brand
      model
      name
      price
      imageUrl
      onSale
      salePrice
    }
  }
`;

export const QUERY_AUTUMN_SNEAKERS = gql`
  query getAutumnSneakers {
    autumnSneakers {
      _id
      brand
      model
      name
      price
      imageUrl
      onSale
      salePrice
    }
  }
`;

