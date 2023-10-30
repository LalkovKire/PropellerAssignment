import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-filter-board',
  templateUrl: './filter-board.component.html',
  styleUrls: ['./filter-board.component.css']
})
export class FilterBoardComponent implements OnInit {

  public selectedSortingOption: string = "1";

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    
  }

  public sortingFilterChange(e: any) : void {
      this.productService.updateProducts(e);
  }

}
