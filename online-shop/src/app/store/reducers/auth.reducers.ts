import {IAuthState, initialAuthState} from "../state/auth.state";
import {AuthActions, EAuthActions} from "../actions/auth.actions";

export const authReducers = (
  state = initialAuthState,
  action: AuthActions
): IAuthState => {
  switch (action.type) {

    case EAuthActions.AuthLoginSuccess: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        failedLogin: false
      };
    }

    case EAuthActions.AuthLoginFail: {
      console.log("failed");
      return {
        ...state,
        failedLogin: true
      }
    }

    case EAuthActions.AuthLogoutSuccess: {
      return {
        ...state,
        isLoggedIn: false,
        user: undefined
      };
    }

    default:
      return state;
  }
};
