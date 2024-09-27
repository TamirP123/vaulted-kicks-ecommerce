import { gql } from "@apollo/client";

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
  query getUsers {
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
  query {
    allSneakers {
      _id
      brand
      model
      name
      price
      description
      imageUrl
      sizes {
        size
        quantity
      }
      gender
      category
      releaseDate
      recommended
      onSale
      salePrice
      autumn
    }
  }
`;

export const QUERY_SINGLE_SNEAKER = gql`
  query getSneaker($id: ID!) {
    sneaker(id: $id) {
      _id
      brand
      model
      name
      gender
      sizes {
        size
        quantity
      }
      price
      imageUrl
      onSale
      salePrice
    }
  }
`;

export const GET_USER_ORDERS = gql`
  query GetUserOrders {
    orders {
      _id
      orderDate
      items {
        sneaker {
          name
        }
        size
        quantity
        price
      }
      total
      shippingAddress {
        fullName
        address
        city
        state
        zipCode
      }
      status
    }
  }
`;

export const QUERY_USER_ORDERS = gql`
  query getUserOrders {
    userOrders {
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

// Add this query
export const QUERY_USER_FAVORITES = gql`
  query {
    me {
      _id
      username
      favorites {
        _id
        brand
        name
        price
        salePrice
        onSale
        imageUrl
      }
    }
  }
`;

// Remove the QUERY_CATEGORIES if it's no longer needed

// Add these queries
export const QUERY_SNEAKER_COUNT = gql`
  query getSneakerCount {
    sneakerCount
  }
`;

export const QUERY_TOTAL_SALES = gql`
  query getTotalSales {
    totalSales
  }
`;

// Add this query to the existing queries
export const QUERY_ALL_ORDERS = gql`
  query getAllOrders {
    allOrders {
      orders {
        _id
        orderDate
        total
        status
        items {
          sneaker {
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
      processingOrdersCount
    }
  }
`;

export const QUERY_ANALYTICS = gql`
  query getAnalytics {
    getAnalytics {
      activeUsers
      pageViews
      averageSessionDuration
      topProducts {
        _id
        name
        brand
        sales
      }
    }
  }
`;
