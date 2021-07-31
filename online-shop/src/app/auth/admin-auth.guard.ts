import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {IAppState} from "../store/state/app.state";
import {select, Store} from "@ngrx/store";
import {selectAuthIsAdmin, selectAuthIsLoggedIn} from "../store/selectors/auth.selectors";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  isLoggedIn$ = this.store.pipe(select(selectAuthIsLoggedIn));
  isAdmin$ = this.store.pipe(select(selectAuthIsAdmin));

  isAdmin = false;
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private store: Store<IAppState>,
    private router: Router
  ) {
    this.isLoggedIn$.subscribe((ret) => {
      if (ret) {
        this.isLoggedIn = ret;
      }
    });
    this.isAdmin$.subscribe((ret) => {
      if (ret) {
        this.isAdmin = ret;
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
      if (this.isAdmin) {
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
