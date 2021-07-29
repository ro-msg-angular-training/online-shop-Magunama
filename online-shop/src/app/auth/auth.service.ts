import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = '/api/login';
  isLoggedIn = false;
  roles: string[] = [];

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(creds: User): Observable<User> {
    return this.http.post<User>(this.loginUrl, creds)
      .pipe(
        catchError(this.handleError('login', creds))
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.roles = [];
  }

  logUser(user: any) {
    this.isLoggedIn = true;
    this.roles = user.roles;
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  redirect(): void {
    // Redirect the user
    this.router.navigate([this.redirectUrl]);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
