import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product!: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService, private loc: Location) {

  }
  ngOnInit(): void {
     this.route.params.subscribe(param => {
      const ID = param['id'];
        this.productService.getProductById(ID).subscribe((res : any) => {
           this.product = res.data.product;
           console.log(res.data.product);
        });
     })
  }

  public goBack(): void {
      this.loc.back();
  }


}
