import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  roles: string[] = [];

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    public authService: AuthService,
    public router: Router,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  login() {
    const creds = this.loginForm.value;

    this.authService.login(creds).subscribe(user => {
      if (user.fullName) {
        this.roles = user.roles;
        this.authService.logUser(user);
        this.authService.redirect();
      } else {
        alert('Wrong credentials');
      }
    });

  }

  logout() {
    this.authService.logout();
  }
}
