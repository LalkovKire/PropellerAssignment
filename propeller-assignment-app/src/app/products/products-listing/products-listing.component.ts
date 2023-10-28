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
       this.products = data.products.items.map((p: any) =>
        new Product(p.id, p.name, p.description, new Date(p.createdAt), p.assets.map((asset: any) => {
          return { source: asset.source };
        })));
     })
  };

}
