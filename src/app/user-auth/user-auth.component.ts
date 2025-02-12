import { Component, OnInit } from '@angular/core';
import { signUp } from '../data-type';

@Component({
  selector: 'app-user-auth',
  standalone: false,

  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  signUp(data: signUp) {
    console.log(data);
  }
}
