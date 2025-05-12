import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  //changes start here
  productData: undefined | product; //this will store all the info about the product with an id
  productQuantity: number = 1; //initial value for product quantity
  removeCart = false; //this will check if the product is already in the cart or not
  cartData: product | undefined; //this will store the cart data
  //changes end here
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

  //changes start here
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        //get user name
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.log(userId);
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId,
        };
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }
  //changes end here
}
