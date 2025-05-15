import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order, orderDetails } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: false,

  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: undefined | cart[];
  orderMessage: string | undefined; //message after the order has been placed
  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
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
    if (data.address == '' || data.contact == '' || data.email == '') {
      this.orderMessage = 'Please enter the details';
      return;
    }

    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
      };

      //after the order has been placed, we need to remove the items from cart
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 500);
      });

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMessage = 'Order has been placed successfully';
          setTimeout(() => {
            this.orderMessage = undefined;
            this.router.navigate(['/my-orders']);
          }, 4000);
        }
      });
    }
  }
}
