import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';

@Component({
  selector: 'app-cart-page',
  standalone: false,

  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cartData: undefined | cart[];
  priceSummary: priceSummary = {
    price: 0,
    tax: 0,
    discount: 0,
    delivery: 0,
    total: 0,
  };
  constructor(private product: ProductService) {}

  ngOnInit() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.log(this.cartData);
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + price / 10 + 100 - price / 10;

      console.log(this.priceSummary);
    });
  }
}
