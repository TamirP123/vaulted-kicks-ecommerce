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

export const QUERY_POPULAR_SNEAKERS = gql`
  query getPopularSneakers {
    popularSneakers {
      _id
      brand
      name
      imageUrl
    }
  }
`;

export const QUERY_LATEST_PICKS = gql`
  query getLatestPicks {
    latestPicks {
      _id
      brand
      name
      imageUrl
    }
  }
`;

export const QUERY_ALL_SNEAKERS = gql`
  query getAllSneakers {
    allSneakers {
      _id
      brand
      model
      name
      price
      imageUrl
      onSale
      salePrice
      gender
      sizes {
        size
        quantity
      }
      description
      category
      releaseDate
    }
  }
`;

// Remove the QUERY_CATEGORIES if it's no longer needed

