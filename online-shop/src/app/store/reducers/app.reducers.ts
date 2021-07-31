import {ActionReducerMap} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {productReducers} from "./product.reducers";
import {routerReducer} from "@ngrx/router-store";
import {cartReducers} from "./cart.reducers";
import {authReducers} from "./auth.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  products: productReducers,
  cart: cartReducers,
  auth: authReducers
};
