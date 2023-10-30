import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GET_PRODUCTS_QUERY } from './queries/getProductsQuery';
import { GET_PRODUCTS_BY_CREATION_ASC_QUERY } from './queries/getProductByCreationASC';
import { GET_PRODUCTS_BY_CREATION_DESC_QUERY } from './queries/getProductByCreationDESC';
import { GET_SORTED_PRODUCTS_ASC_QUERY } from './queries/getSortedProductNameASC';
import { GET_SORTED_PRODUCTS_DESC_QUERY } from './queries/getSortedProductNameDSC';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productSubject = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productSubject.asObservable();
  public sortingOption: string = "1";

  constructor(private apollo: Apollo) { 
     this.fetchProducts(this.sortingOption);
  }

  private fetchProducts(option: any = "1") {
    let query;
    switch (option) {
      case "2":
        query = GET_SORTED_PRODUCTS_ASC_QUERY;
        break;
      case "3":
        query = GET_SORTED_PRODUCTS_DESC_QUERY;
        break;
      case "4":
        query = GET_PRODUCTS_BY_CREATION_ASC_QUERY;
        break;
      case "5":
        query = GET_PRODUCTS_BY_CREATION_DESC_QUERY;
        break;
      default:
        query = GET_PRODUCTS_QUERY;
    }
    this.apollo.query({
      query: query
    }).pipe(
      map((result: any) => result.data.products)
    ).subscribe((products: any) => {
      this.productSubject.next(products.items);
    });
  }

  updateProducts(option: any) {
    this.fetchProducts(option);
  }

  getProductById(id: number) { 
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
