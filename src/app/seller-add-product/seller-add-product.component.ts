import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  standalone: false,

  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {}
  submit(data: product) {
    if (
      data.name === '' ||
      String(data.price) === '' ||
      data.category === '' ||
      data.color === '' ||
      data.description === '' ||
      data.image === ''
    ) {
      this.addProductMessage = 'Please enter all the details';
      setTimeout(() => {
        this.addProductMessage = undefined;
      }, 3000);
      return;
    } else {
      this.product.addProduct(data).subscribe((result) => {
        console.log(result);
        if (result) {
          this.addProductMessage = 'Product is added successfully';
        }
      });
      this.route.navigate(['/seller-home']);
    }

    setTimeout(() => {
      this.addProductMessage = undefined;
    }, 3000);
  }
}
