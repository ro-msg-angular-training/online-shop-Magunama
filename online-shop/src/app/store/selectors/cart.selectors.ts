import {createSelector} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {ICartState} from "../state/cart.state";

const selectCart = (state: IAppState) => state.cart;

export const selectCartItems = createSelector(
  selectCart,
  (state: ICartState) => state.products
);
