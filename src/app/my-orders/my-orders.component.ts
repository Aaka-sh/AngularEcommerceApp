import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component'; // adjust path

@Component({
  selector: 'app-my-orders',
  standalone: false,

  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent implements OnInit {
  faTimes = faTimes;
  orderListData: undefined | order[];
  constructor(private dialog: MatDialog, private product: ProductService) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  // cancel order function with simple window prompt

  // cancelOrder(orderId: string | undefined) {
  //   if (orderId) {
  //     const confirmed = window.confirm(
  //       'Are you sure you want to cancel this order?'
  //     );
  //     if (confirmed) {
  //       this.product.cancelOrder(orderId).subscribe((result) => {
  //         if (result) {
  //           console.log('Order has been cancelled');
  //           this.getOrderList(); // Refresh the order list
  //         }
  //       });
  //     }
  //   }
  // }
  cancelOrder(orderId: string | undefined): void {
    if (!orderId) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to cancel this order?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.product.cancelOrder(orderId).subscribe((response) => {
          if (response) {
            console.log('Order has been cancelled');
            this.getOrderList(); // Refresh the order list
          }
        });
      }
    });
  }

  getOrderList() {
    this.product.orderList().subscribe((result) => {
      if (result) {
        this.orderListData = result;
      }
    });
  }
}
