import { Component, OnInit} from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.css']
})
export class ProductsListingComponent implements OnInit {

  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public filteringState: boolean = false;

  constructor(public productService: ProductService){ 
  };


  ngOnInit(): void {
    this.productService.products$.subscribe((products: Product[]) => {
      this.products = products.map(product => new Product(
        product.id,
        product.name,
        product.description,
        new Date(product.createdAt),
        product.assets.map(asset => ({ source: asset.source })),
        product.variants.map(variant => ({
          id: variant.id,
          name: variant.name,
          price: variant.price,
          stockLevel: variant.stockLevel,
          sku: variant.sku
        }))
      ));
    });
    this.productService.filteredProducts$.subscribe((products: Product[]) => {
      this.filteredProducts = products.map(product => new Product(
        product.id,
        product.name,
        product.description,
        new Date(product.createdAt),
        product.assets.map(asset => ({ source: asset.source })),
        product.variants.map(variant => ({
          id: variant.id,
          name: variant.name,
          price: variant.price,
          stockLevel: variant.stockLevel,
          sku: variant.sku
        }))
      ));
    });
    this.productService.filteringState$.subscribe((state: boolean) => {
      this.filteringState = state;
    });
  };

}
