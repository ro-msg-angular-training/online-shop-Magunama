import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {select, Store} from "@ngrx/store";
import {IAppState} from "../store/state/app.state";
import {selectAuthIsLoggedIn} from "../store/selectors/auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  isLoggedIn$ = this.store.pipe(select(selectAuthIsLoggedIn));

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
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean | UrlTree {
    if (this.isLoggedIn) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl('/login');
  }

}
