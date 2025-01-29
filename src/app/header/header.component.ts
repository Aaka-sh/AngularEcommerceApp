import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  //creating a flag-type variable to track whether the seller is logged in or not
  menuType: string = 'default';
  //creating an instance of Router service
  constructor(private route: Router) {}
  ngOnInit() {
    //events method is an observable that emits events related to navigation changes
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn('Inside');
          this.menuType = 'seller';
        } else {
          console.warn('Outside');
          this.menuType = 'default';
        }
      }
    });
  }
}
