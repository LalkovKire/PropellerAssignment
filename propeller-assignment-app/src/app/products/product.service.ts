import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GET_PRODUCTS_QUERY } from './queries/getProductsQuery';
import { GET_PRODUCTS_BY_CREATION_ASC_QUERY } from './queries/getProductByCreationASC';
import { GET_PRODUCTS_BY_CREATION_DESC_QUERY } from './queries/getProductByCreationDESC';
import { GET_SORTED_PRODUCTS_ASC_QUERY } from './queries/getSortedProductNameASC';
import { GET_SORTED_PRODUCTS_DESC_QUERY } from './queries/getSortedProductNameDSC';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productSubject = new BehaviorSubject<Product[]>([]);
  private filteredSubject = new BehaviorSubject<Product[]>([]);
  private searchedProducts = new BehaviorSubject<string[]>([]);
  private filteringStateSubject = new BehaviorSubject<boolean>(false);
  public filteringState$: Observable<boolean> = this.filteringStateSubject.asObservable();
  public products$: Observable<Product[]> = this.productSubject.asObservable();
  public filteredProducts$: Observable<Product[]> = this.filteredSubject.asObservable();
  public sortingOption: string = "Default";

  constructor(private apollo: Apollo) { 
     this.fetchProducts(this.sortingOption);
  }

  private fetchProducts(option: any = "Default") {
    let query;
    switch (option) {
      case "NameASC":
        query = GET_SORTED_PRODUCTS_ASC_QUERY;
        break;
      case "NameDESC":
        query = GET_SORTED_PRODUCTS_DESC_QUERY;
        break;
      case "TimeASC":
        query = GET_PRODUCTS_BY_CREATION_ASC_QUERY;
        break;
      case "TimeDESC":
        query = GET_PRODUCTS_BY_CREATION_DESC_QUERY;
        break;
      default:
        query = GET_PRODUCTS_QUERY;
    }
    this.apollo.query({
      query: query
    }).subscribe((res: any) => {
      const products = res.data.products.items;
      this.productSubject.next(products);
    });
  }

  public getProductsBySearchFilter(searchResult: string) {
      if (searchResult === "")  {
         this.filteredSubject.next([]);
         this.filteringStateSubject.next(false);
      } else {
        this.apollo.query({
          query: gql`
            query {
              search(input: {term: "${searchResult}", groupByProduct: true, take: 50}) {
                items {
                  productId
                }
              }
            }`
        }).subscribe((res: any) => {
            if (res.data.search.items.length > 0) {
                const productIds = res.data.search.items.map((item: any) => item.productId);
                this.searchedProducts.next(productIds);
                const products = this.productSubject.getValue();
                const filteredProducts = products.filter((product: Product) => productIds.includes(product.id));
                this.filteredSubject.next(filteredProducts);
            } else {
              this.filteredSubject.next([]);
            }
          })
      }
      
  } 

  public setFilteringState(state: boolean) {
    this.filteringStateSubject.next(state);
  }

  public updateProducts(option: any) {
    if (this.filteredSubject.getValue().length > 0) {
        this.fetchFilteredProductsSorted(option);
    } else {
        this.fetchProducts(option);
    }
  }

  private fetchFilteredProductsSorted(option: string = "Default") {
    let sortedProducts = this.filteredSubject.getValue();
    switch (option) {
      case "NameASC":
       sortedProducts.sort((a,b) =>  a.name.localeCompare(b.name));
        break;
      case "NameDESC":
        sortedProducts.sort((a,b) => b.name.localeCompare(a.name));
        break;
      case "TimeASC":
        sortedProducts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "TimeDESC":
        sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        sortedProducts.sort((a,b) => a.id - b.id);
    }
    this.filteredSubject.next(sortedProducts);
  }

  public getProductById(id: number) { 
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
            id
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
