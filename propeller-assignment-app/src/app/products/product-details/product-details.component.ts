import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';
import { OrderService } from 'src/app/orders/order.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product!: Product;
  public checkProductSubmission: boolean = true;
  public variantID : number = 999;
  public selectedVariant: boolean = false;
  public validator: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private loc: Location,
    private orderService: OrderService) {

  }
  ngOnInit() : void {
     this.route.params.subscribe(param => {
      const ID = param['id'];
        this.productService.getProductById(ID).subscribe((res : any) => {
           this.product = res.data.product;
          
        });
     })
  }

  public selectVariant(id: number) : void {
      this.variantID = id;
      this.selectedVariant = true;
  }
  
  public submitOrder() : void {
    if (this.selectedVariant) {
      this.checkProductSubmission = false;
      this.orderService.addProductToOrderList(this.variantID);
      this.validator = false;
    } else {
      this.validator = true;
    }
  }

  public goBack(): void {
      this.loc.back();
  }


}
