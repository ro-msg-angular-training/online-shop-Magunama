import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from "@ngrx/store";
import {selectAuthUserRoles} from "../store/selectors/auth.selectors";
import {AuthService} from "./auth.service";
import {IAppState} from "../store/state/app.state";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  userRoles$ = this.store.pipe(select(selectAuthUserRoles));
  userRoles: string[] = [];

  constructor(
    private authService: AuthService,
    private store: Store<IAppState>,
    private router: Router
  ) {
    this.userRoles$.subscribe((ret) => {
      if (ret) {
        this.userRoles = ret;
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;

    if (this.userRoles.length > 0) {
      if (route.data.roles && this.meetsRoleReq(route.data.roles)) {
        return true;
      }
      alert('Improper roles!');
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl('/login');
  }

  meetsRoleReq(roleReq: string[]): boolean {
    for (let role of this.userRoles) {
      if (roleReq.includes(role)) {
        return true;
      }
    }

    return false;
  }
  
}
