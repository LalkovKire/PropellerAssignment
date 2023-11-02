import { gql } from "apollo-angular";

export const GET_PRODUCTS_BY_CREATION_ASC_QUERY = gql`
query {
    products(options: {take: 50, sort: {createdAt: ASC} }) {
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