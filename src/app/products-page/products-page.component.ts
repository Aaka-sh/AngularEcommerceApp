import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-page',
  standalone: false,

  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  trendyProducts: undefined | product[];
  allProducts: undefined | product[];

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.productList().subscribe((result) => {
      //console.log(result);
      this.allProducts = result;
    });
    this.product.trendyProducts().subscribe((result) => {
      //console.log(result);
      this.trendyProducts = result;
    });
  }
}
