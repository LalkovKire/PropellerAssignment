import { gql } from "apollo-angular";

export const GET_SORTED_PRODUCTS_ASC_QUERY = gql`
query {
    products(options: {take: 50, sort: {name: ASC} }) {
      items {
        name
        description
        createdAt
        id
        assets {
          source
        }
        variants {
          id
          name
          price
          stockLevel
          sku
        }
      }
    }
  }`;