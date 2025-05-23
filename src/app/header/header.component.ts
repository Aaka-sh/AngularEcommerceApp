import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  showDropdown = false;
  cartIcon = faCartShopping; //cart icon
  searchIcon = faSearch; //search icon
  caretDownIcon = faCaretDown; //caret down icon
  bagIcon = faShoppingBag; //shopping bag icon
  sellerName: string = ''; //seller name
  userName: string = ''; //user name
  menuType: string = 'default'; //creating a flag-type variable to track whether the seller is logged in or not
  searchResult: undefined | product[]; //this will contain the search result
  cartItems = 0; //number of items in the cart

  //creating an instance of Router service and Product service
  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    //events method is an observable that emits events related to navigation changes
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          //this will check if the sellerstore is empty before assigning value to sellerdata
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.username;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          //this will check if the user store is empty before assigning value to sellerdata
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.username;
          this.menuType = 'user';
          this.product.getCartList(userData.id);
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  //logout function
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  //user logout function
  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        //filter the results based on the search keyword as the api is returning all the products
        let response: product[] = result.filter((item: product) =>
          Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(element.value.toLowerCase())
          )
        );
        console.log(response);
        this.searchResult = response;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([`search/${val}`]);
    });
  }

  redirectToDetails(id: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['details/' + id]);
    });
  }
}
