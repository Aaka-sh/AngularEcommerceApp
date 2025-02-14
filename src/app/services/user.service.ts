import { Injectable } from '@angular/core';
import { signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(user: signUp) {
    this.http
      .post('http://localhost:3000/users', user, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result) {
          //storing the session in the local storage
          localStorage.setItem('user', JSON.stringify(result.body));
          //after registration redirect to home page
          this.router.navigate(['/']);
        }
      });
  }

  //this function will restrict the user to go to the user-auth route when a user is logged in
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
