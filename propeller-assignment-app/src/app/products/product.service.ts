import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apollo: Apollo) { }

  getProducts() {
     return this.apollo.query({
      query: gql`
      query {
        products(options: { take: 50 } ) {
           items {
             name   
             description
             createdAt
             id
             assets {
              source
              }
          }
        }
    }`
     });
  };
}
