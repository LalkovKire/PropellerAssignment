import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsListingComponent } from './products-listing/products-listing.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListingComponent,
    ProductItemComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    ProductsComponent,
    ProductDetailsComponent,
    ProductsListingComponent,
    ProductItemComponent
  ]
})
export class ProductsModule { }
