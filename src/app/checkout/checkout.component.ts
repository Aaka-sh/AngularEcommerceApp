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
    //checking if the address, contact and email fields are empty
    if (data.address == '' || data.contact == '' || data.email == '') {
      this.orderMessage = 'Please enter the details';
      return;
    }

    //checking if the address, contact and email are valid using regex
    //checking if the email, password and name are valid using regex
    const email = data.email;
    const address = data.address;
    const contact = data.contact;

    // Regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const addressRegex = /^[a-zA-Z0-9\s,.\-/#()]{5,100}$/;
    const contactRegex = /^\d{10}$/;

    // Email validation
    if (!emailRegex.test(email)) {
      alert('Invalid email format');
      return;
    }

    // Username validation
    if (!addressRegex.test(address)) {
      alert('Address must be atleast 10 characters');
      return;
    }

    // Password validation
    if (!contactRegex.test(contact)) {
      alert('Contact number must be 10 digits');
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
