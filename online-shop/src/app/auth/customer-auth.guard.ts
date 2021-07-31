import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {IAppState} from "../store/state/app.state";
import {select, Store} from "@ngrx/store";
import {selectAuthIsCustomer, selectAuthIsLoggedIn} from "../store/selectors/auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthGuard implements CanActivate {
  isLoggedIn$ = this.store.pipe(select(selectAuthIsLoggedIn));
  isCustomer$ = this.store.pipe(select(selectAuthIsCustomer));

  isCustomer = false;
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<IAppState>
  ) {
    this.isLoggedIn$.subscribe((ret) => {
      if (ret) {
        this.isLoggedIn = ret;
      }
    });
    this.isCustomer$.subscribe((ret) => {
      if (ret) {
        this.isCustomer = ret;
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean | UrlTree {
    if (this.isLoggedIn) {
      if (this.isCustomer) {
        return true;
      }
      alert('Improper roles!');
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl('/login');
  }
  
}
