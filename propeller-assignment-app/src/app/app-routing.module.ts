import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { ProductsListingComponent } from './products/products-listing/products-listing.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', component: ProductsComponent, children: [
    {path: '', component: ProductsListingComponent },
    { path: "product/details/:id", component:  ProductDetailsComponent },
  ]},
  {
    path: 'orders', component: OrdersComponent
  },
  { path: "**", redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
