import {User} from "../../model/user";

export interface IAuthState {
  user?: User;
  isLoggedIn: boolean;
  failedLogin: boolean;
}

export const initialAuthState: IAuthState = {
  user: undefined,
  isLoggedIn: false,
  failedLogin: false,
};
