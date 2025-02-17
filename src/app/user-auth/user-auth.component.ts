import { Component, OnInit } from '@angular/core';
import { login, signUp } from '../data-type';
import { UserService } from '../services/user.service';

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
  constructor(private user: UserService) {}
  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: signUp) {
    this.user.userSignUp(data);
  }

  login(data: login) {
    this.user.userLogin(data);
    this.user.isLoginEmitter.subscribe((isError) => {
      console.warn(isError);
      if (isError) {
        this.authError = 'Incorrect Credentials';
      }
    });
  }

  openSignup() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }
}
