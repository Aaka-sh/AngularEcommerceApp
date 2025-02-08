import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];
  constructor(private product: ProductService) {}

  ngOnInit() {
    this.product.popularProducts().subscribe((result) => {
      //console.log(result);
      this.popularProducts = result;
    });
    this.product.trendyProducts().subscribe((result) => {
      //console.log(result);
      this.trendyProducts = result;
    });
  }
}
