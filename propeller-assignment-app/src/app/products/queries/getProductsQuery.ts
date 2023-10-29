import { gql } from "apollo-angular";

export const GET_PRODUCTS_QUERY = gql`
query {
    products(options: { take: 50 }) {
      items {
        name
        description
        createdAt
        id
        assets {
          source
        }
        variants {
          name
          price
          stockLevel
          sku
        }
      }
    }
  }`;