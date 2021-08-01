import {createSelector} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {IAuthState} from "../state/auth.state";

const selectAuth = (state: IAppState) => state.auth;

export const selectAuthIsLoggedIn = createSelector(
  selectAuth,
  (state: IAuthState) => state.isLoggedIn
);

export const selectAuthUserRoles = createSelector(
  selectAuth,
  (state: IAuthState) => state.user?.roles
);

export const selectAuthIsCustomer = createSelector(
  selectAuth,
  (state: IAuthState) => state.user?.roles.includes('customer')
);

export const selectAuthIsAdmin = createSelector(
  selectAuth,
  (state: IAuthState) => state.user?.roles.includes('admin')
);

export const selectAuthFailedLogin = createSelector(
  selectAuth,
  (state: IAuthState) => state.failedLogin
);

export const selectAuthUsername = createSelector(
  selectAuth,
  (state: IAuthState) => state.user?.username
);
