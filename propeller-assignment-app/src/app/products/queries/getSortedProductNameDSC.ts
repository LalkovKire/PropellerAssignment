import { gql } from "apollo-angular";

export const GET_SORTED_PRODUCTS_DESC_QUERY = gql`
query {
    products(options: {take: 50, sort: {name: DESC} }) {
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