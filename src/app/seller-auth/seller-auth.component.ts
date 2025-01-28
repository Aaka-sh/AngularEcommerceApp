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
  showLogin = false;
  authError: string = '';
  constructor(private seller: SellerService) {}

  //check if seller is already logged in when the component is loaded
  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  //seller sign up function
  signUp(data: signUp): void {
    console.warn(data);
    this.seller.userSignUp(data);
  }
  //seller login function
  login(data: signUp): void {
    //console.warn(data);
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
