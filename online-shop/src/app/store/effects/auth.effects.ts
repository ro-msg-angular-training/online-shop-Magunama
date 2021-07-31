import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {
  AuthLogin, AuthLoginFail,
  AuthLoginSuccess,
  AuthLogout,
  AuthLogoutSuccess,
  EAuthActions
} from "../actions/auth.actions";


@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<AuthLogin>(EAuthActions.AuthLogin),
      map((action) => action.payload),
      switchMap((creds) => this.authService.login(creds)),
      switchMap((user) => {
        if (user.fullName) {
          return of(new AuthLoginSuccess(user));
        }
        return of(new AuthLoginFail());
      })
    )
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<AuthLogout>(EAuthActions.AuthLogout),
      switchMap(() => of(new AuthLogoutSuccess()))
    )
  });

}
