import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Variants } from '../products/models/product';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public productVariants: Variants[] = [];
  constructor(private orderServie: OrderService) {

  }

  ngOnInit(): void {
      this.orderServie.orders$.subscribe((variants: Variants[]) => {
         this.productVariants = variants.map((variant: Variants) => ({
          id: variant.id,
          name: variant.name,
          price: variant.price,
          stockLevel: variant.stockLevel,
          sku: variant.sku
         }));
      })
  }

  public calcTotalAmount() : number {
     let amount : number = 0;
     this.productVariants.forEach(item => amount += item.price);
     return amount;
  }

}
