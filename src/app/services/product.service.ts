import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //whenever there is any change in the cart items, other parts of app will be notified
  cartData = new EventEmitter<product[] | []>();

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

  //this function will get the product details for a specific product
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  //this function will update the product details for a specific product
  updateProduct(product: product) {
    //for updation of information, we use put
    return this.http.put<product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }

  //for displaying the popular products in the carousel
  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }

  //for displaying the trendy products on the home page
  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  //for searching and displaying the products
  searchProduct(query: string) {
    //query will contain the keyword in search input field
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  //this function adds cart items in local storage if the user is not logged in
  //first it checks if the local storage already contains the cart items
  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => item.id !== productId);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  //this function will retrieve products in the cart for a specific user from DB
  getCartList(userId: number) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  //function to remove items from cart
  removeFromCart(cartId: string) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  //function to get items from the cart
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(
      'http://localhost:3000/cart?userId=' + userData.id
    );
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(
      'http://localhost:3000/orders?userId=' + userData.id
    );
  }

  deleteCartItems(cartId: string) {
    return this.http
      .delete('http://localhost:3000/cart/' + cartId)
      .subscribe((result) => {
        this.cartData.emit([]);
      });
  }
}
