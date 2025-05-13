import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  standalone: false,

  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product; //this will store all the info about the product with an id
  productQuantity: number = 1; //initial value for product quantity
  removeCart = false; //
  cartData: product | undefined;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;
        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (items: product) => productId == items.id.toString()
          );
          //console.warn('Items: ', items);
          if (items.length) {
            this.cartData = items[0];
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }

        //if the user reloads the page, the cart shows count from local cart
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result) => {
            let item = result.filter(
              (item: product) =>
                productId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
        }
      });
  }

  handleQuantity(val: string) {
    if (this.productQuantity <= 5 && val == 'add') {
      this.productQuantity += 1;
      // this.addToCart();
    } else if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity -= 1;
      // this.addToCart();
    }
  }

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

  removeFromCart(productId: string) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
    } else {
      console.log('Cart Data: ', this.cartData);
      this.cartData &&
        this.product.removeFromCart(this.cartData.id).subscribe((result) => {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
        });
    }
    //change the button to 'Add to Cart'
    this.removeCart = false;
  }
}
