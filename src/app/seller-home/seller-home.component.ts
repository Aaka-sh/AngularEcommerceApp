import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: false,

  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent implements OnInit {
  //productList will hold the api result
  productList: undefined | product[];
  //productMessage after the product is deleted
  productMessage: undefined | string;

  icon = faTrash;
  updateIcon = faEdit;
  //instance of product service
  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    //call api when the page is first loaded
    this.list();
  }

  deleteProduct(id: string): void {
    console.log(id);
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product deleted successfully';
        //call the api after the product has been deleted
        this.list();
      }
    });
    //setTimeout function displays the error message for 3 seconds
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    //call the api to get the product list
    this.product.productList().subscribe((result) => {
      console.warn(result);
      if (result) {
        this.productList = result;
      }
    });
  }

  // //function to redirect to a page
  // redirect(itemId: string) {
  //   this.router.navigate([`/seller-update-product/${itemId}`]);
  // }
}
