import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //this flag will be set to true when a login error occurs
  isLoginEmitter = new EventEmitter<boolean>(false);
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

  userLogin(data: login) {
    this.http
      .get<signUp[]>(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length === 1) {
          this.isLoginEmitter.emit(true);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        } else {
          console.warn('Login failed');
          this.isLoginEmitter.emit(true);
        }
      });
  }
}
