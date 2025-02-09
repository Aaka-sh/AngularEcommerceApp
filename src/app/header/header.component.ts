import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  //search icon
  searchIcon = faSearch;
  //seller name
  sellerName: string = '';
  //creating a flag-type variable to track whether the seller is logged in or not
  menuType: string = 'default';
  //this will contain the search result
  searchResult: undefined | product[];
  //creating an instance of Router service
  constructor(private route: Router, private product: ProductService) {}
  ngOnInit(): void {
    //events method is an observable that emits events related to navigation changes
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          //this will check if the sellerstore is empty before assigning value to sellerdata
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  //logout function
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.log(element.value);
      this.product.searchProduct(element.value).subscribe((result) => {
        console.warn(result);
        if (result.length > 5) {
          result.length = length;
        }
        this.searchResult = result;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }
}
