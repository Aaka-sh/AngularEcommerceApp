import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
// import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  standalone: false,

  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent {
  //message to be displayed when the update is successful
  updateProductMessage: undefined | string;
  //this variable will store all the product data (type is product interface)
  productData: undefined | product;
  //activated route is a service that allows to access information about the currently
  //activated routes like query parameters or URL fragments
  //creating instance of ActivatedRoute
  constructor(private route: ActivatedRoute, private product: ProductService) {}
  ngOnInit(): void {
    //snapshot is a property of ActivatedRoute that captures the current state of the route
    //paramMap is an object that holds all the route parameters
    //.get('id') retrieves the value of the parameter named "id" from the URL
    //the parameter name here (in this case 'id') is the same as the parameter name used in app routing module
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    //the && condition signifies if the productid is available then only call the api
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        console.log(result);
        this.productData = result;
      });
  }

  submit(data: any) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    //calling the update product function from the product instance
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.updateProductMessage = 'PRODUCT IS SUCCESSFULLY UPDATED';
      }
    });

    setTimeout(() => {
      this.updateProductMessage = undefined;
    }, 3000);
    console.warn(data);
  }
}
