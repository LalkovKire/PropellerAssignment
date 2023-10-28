import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Product } from './models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [];

  constructor(private apollo: Apollo){
  };

  ngOnInit(): void {
     this.apollo.query({
      query: gql`
      query {
        products(options: { take: 5 } ) {
           items {
             name   
             description
             createdAt
             id
          }
        }
    }`
     }).subscribe(({ data } : any) => {
       this.products = data.products.items.map((p: any) => new Product(p.id, p.name, p.description, new Date(p.createdAt) ));
     })
  };
  
}
