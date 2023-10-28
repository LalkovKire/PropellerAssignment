import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService){
  };

  ngOnInit(): void {
    
  };
  
}
