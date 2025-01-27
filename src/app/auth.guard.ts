import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './services/seller.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sellerService: SellerService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.sellerService.isSellerLoggedIn.pipe(
      map((isLoggedIn: boolean) => {
        if (isLoggedIn && localStorage.getItem('seller')) {
          return true; // Allow navigation
        } else {
          return this.router.createUrlTree(['/seller-login']); // Redirect if not logged in
        }
      })
    );
  }
}
