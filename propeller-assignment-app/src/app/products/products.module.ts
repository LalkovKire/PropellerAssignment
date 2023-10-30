import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsListingComponent } from './products-listing/products-listing.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AppRoutingModule } from '../app-routing.module';
import { FilterBoardComponent } from './filter-board/filter-board.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListingComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    FilterBoardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    ProductsComponent,
    ProductDetailsComponent,
    ProductsListingComponent,
    ProductItemComponent
  ]
})
export class ProductsModule { }
