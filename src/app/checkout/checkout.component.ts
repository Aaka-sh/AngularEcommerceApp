import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order, orderDetails } from '../data-type';

@Component({
  selector: 'app-checkout',
  standalone: false,

  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.totalPrice = price + price / 10 + 100 - price / 10;

      console.log(this.totalPrice);
    });
  }

  orderNow(data: orderDetails) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
      };

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          alert('Order has been placed successfully');
        }
      });
    }
  }
}
