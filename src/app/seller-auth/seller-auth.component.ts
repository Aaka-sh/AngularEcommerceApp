import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { signUp } from '../data-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-auth',
  standalone: false,

  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent implements OnInit {
  //flag to show the login form or sign up form
  showLogin = false;
  //in case of incorrect credentials
  authError: string = '';
  constructor(private seller: SellerService) {}

  //check if seller is already logged in when the component is loaded
  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  //seller sign up function
  signUp(data: signUp): void {
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
    console.warn(data);
    this.seller.userSignUp(data);
  }
  //seller login function
  login(data: signUp): void {
    //console.warn(data);
    if (data.email == '' || data.password == '') {
      alert('Please fill all the fields');
      this.authError = 'Please fill all the fields';
      return;
    }
    this.seller.userLogin(data);
    this.seller.isLoginEmitter.subscribe((isError) => {
      console.warn(isError);
      if (isError) {
        this.authError = 'Incorrect Credentials';
      }
    });
  }

  //functions for login-signup toggle
  //when the seller login button is clicked
  openLogin() {
    this.showLogin = true;
  }
  //when the seller sign up button is clicked
  openSignUp() {
    this.showLogin = false;
  }
}
