import { Injectable } from '@angular/core';
import { product } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  //this function will add the product details in the database (fake api)
  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }

  //this function will get the product details for the product list
  productList() {
    //typecast the response into an array of product (interface)
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: product) {
    //for updation of information, we use put
    return this.http.put<product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }

  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }

  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }
}
