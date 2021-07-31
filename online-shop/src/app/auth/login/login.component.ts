import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {IAppState} from "../../store/state/app.state";
import {select, Store} from "@ngrx/store";
import {AuthLogin, AuthLogout} from "../../store/actions/auth.actions";
import {selectAuthFailedLogin, selectAuthIsLoggedIn, selectAuthUserRoles} from "../../store/selectors/auth.selectors";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn$ = this.store.pipe(select(selectAuthIsLoggedIn));
  failedLogin$ = this.store.pipe(select(selectAuthFailedLogin));
  roles$ = this.store.pipe(select(selectAuthUserRoles));

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    public store: Store<IAppState>,
    public router: Router,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.failedLogin$.subscribe(ret => {
      if (ret) {
        alert('Wrong credentials!');
      }
    });
    this.isLoggedIn$.subscribe(ret => {
      if (ret) {
        this.authService.redirect();
      }
    });
  }

  login() {
    const creds = this.loginForm.value;

    this.store.dispatch(new AuthLogin(creds));
  }

  logout() {
    this.store.dispatch(new AuthLogout());
  }
}
