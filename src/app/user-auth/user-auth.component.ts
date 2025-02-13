import { Component, OnInit } from '@angular/core';
import { signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  standalone: false,

  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  constructor(private user: UserService) {}
  ngOnInit(): void {}

  signUp(data: signUp) {
    this.user.userSignUp(data);
  }
}
