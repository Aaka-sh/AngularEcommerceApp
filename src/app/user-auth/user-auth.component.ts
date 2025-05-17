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
    //checking if the email, password and name fields are empty
    if (data.email == '' || data.password == '' || data.name == '') {
      this.authError = 'Please fill all the fields';
      return;
    }
    //checking if the email, password and name are valid using regex
    const email = data.email;
    const username = data.name;
    const password = data.password;

    // Regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // Email validation
    if (!emailRegex.test(email)) {
      alert('Invalid email format');
      return;
    }

    // Username validation
    if (!usernameRegex.test(username)) {
      alert('Username must be 3-20 characters and alphanumeric');
      return;
    }

    // Password validation
    if (!passwordRegex.test(password)) {
      alert(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
      );
      return;
    }
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
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartListData: product[] = JSON.parse(data);
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
    //because the JSON server can not handle multiple requests at the same time, we will use set time out function
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
