import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.css']
})
export class ProductsListingComponent implements OnInit {

  public products: Product[] = [];

  constructor(private productService: ProductService){
  };


  ngOnInit(): void {
    this.productService.getProducts().subscribe(({ data } : any) => {
       this.products = data.products.items.map((product: any) =>
        new Product(product.id, product.name, product.description,
          new Date(product.createdAt),
          product.assets.map((asset: any) => {
            return { source: asset.source };
          }), product.variants.map((variant: any) => {
            return { 
              name: variant.name,
              price: variant.price,
              stockLevel: variant.stockLevel,
              sku: variant.sku
            };
        })));
     })
  };

}
