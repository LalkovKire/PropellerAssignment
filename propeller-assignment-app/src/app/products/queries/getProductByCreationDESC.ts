import { gql } from "apollo-angular";

export const GET_PRODUCTS_BY_CREATION_DESC_QUERY = gql`
query {
    products(options: {take: 50, sort: {createdAt: DESC} }) {
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