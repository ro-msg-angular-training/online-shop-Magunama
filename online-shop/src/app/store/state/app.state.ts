import {RouterReducerState} from "@ngrx/router-store";
import {initialProductState, IProductState} from "./product.state";
import {ICartState, initialCartState} from "./cart.state";
import {IAuthState, initialAuthState} from "./auth.state";

export interface IAppState {
  router?: RouterReducerState;
  products: IProductState;
  cart: ICartState;
  auth: IAuthState;
}

export const initialAppState: IAppState = {
  products: initialProductState,
  cart: initialCartState,
  auth: initialAuthState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
