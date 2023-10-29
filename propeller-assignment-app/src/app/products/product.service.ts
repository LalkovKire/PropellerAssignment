import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GET_PRODUCTS_QUERY } from './queries/getProductsQuery';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apollo: Apollo) { }

  getProducts() {
     return this.apollo.query({
      query: GET_PRODUCTS_QUERY
     });
  };

  getProductById(id: number) {  // Can't extract this one, the parameters are needed. 
    return this.apollo.query({
      query: gql`
      query {
        product(id: ${id}) {
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
    }`
    });
  }
}
