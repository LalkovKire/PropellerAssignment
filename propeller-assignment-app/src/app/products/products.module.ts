import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsListingComponent } from './products-listing/products-listing.component';
import { ProductItemComponent } from './product-item/product-item.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListingComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
