import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
  //creating an instance of Router service
  constructor(private route: Router) {}
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
}
