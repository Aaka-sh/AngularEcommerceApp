import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  standalone: false,

  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent implements OnInit {
  orderListData: undefined | order[];
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.orderList().subscribe((result) => {
      if (result) {
        this.orderListData = result;
      }
    });
  }
}
