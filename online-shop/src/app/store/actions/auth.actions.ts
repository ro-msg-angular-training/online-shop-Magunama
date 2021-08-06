import {Action} from '@ngrx/store';
import {User} from "../../model/user";


export enum EAuthActions {
  AuthLogin = '[Auth] Login',
  AuthLoginSuccess = '[Auth] Login Success',
  AuthLoginFail = '[Auth] Login Fail',
  AuthLogout = '[Auth] Logout',
  AuthLogoutSuccess = '[Auth] Logout Success',
}

export class AuthLogin implements Action {
  public readonly type = EAuthActions.AuthLogin;
  constructor(public payload: any) {}
}

export class AuthLoginSuccess implements Action {
  public readonly type = EAuthActions.AuthLoginSuccess;
  constructor(public payload: User) {}
}

export class AuthLoginFail implements Action {
  public readonly type = EAuthActions.AuthLoginFail;
}

export class AuthLogout implements Action {
  public readonly type = EAuthActions.AuthLogout;
}

export class AuthLogoutSuccess implements Action {
  public readonly type = EAuthActions.AuthLogoutSuccess;
}

export type AuthActions = AuthLogin | AuthLoginSuccess | AuthLoginFail
  | AuthLogout | AuthLogoutSuccess;
