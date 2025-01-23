import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-auth',
  standalone: false,

  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  signUp(data: object): void {
    console.warn(data);
  }
}
