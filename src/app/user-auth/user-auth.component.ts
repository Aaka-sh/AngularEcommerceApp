import { Component, OnInit } from '@angular/core';
import { cart, login, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: false,

  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  //in case of incorrect credentials
  authError: string = '';
  //flag to show the login form or sign up form
  showLogin: boolean = true;

  constructor(private user: UserService, private product: ProductService) {}
  ngOnInit(): void {
    this.user.userAuthReload();
  }

  //user sign up
  signUp(data: signUp) {
    this.user.userSignUp(data);
  }

  //user login
  login(data: login) {
    this.user.userLogin(data);
    this.user.isLoginEmitter.subscribe((isError) => {
      console.warn(isError);
      if (isError) {
        this.authError = 'Incorrect Credentials';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  //hides form when needed
  openSignup() {
    this.showLogin = false;
  }

  //shows login form when needed
  openLogin() {
    this.showLogin = true;
  }

  //transfer contents of cart from local storage to database
  localCartToRemoteCart() {
    //getting the local cart contents
    let data = localStorage.getItem('localCart');
    if (data) {
      let cartListData: product[] = JSON.parse(data);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      cartListData.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log('Data transferred from local storage to DB');
            }
          });
        }, 500);
        if (cartListData.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }
  }
}
