import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {distinctUntilChanged, map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {of} from "rxjs";
import {
  AddCartItem, AddCartItemSuccess,
  ECartActions, LoadCartItems, LoadCartItemsSuccess,
  PlaceOrder, PlaceOrderSuccess,
  RemoveCartItem, RemoveCartItemSuccess, SaveCartItemsSuccess
} from "../actions/cart.actions";
import {CartService} from "../../cart.service";
import {IAppState} from "../state/app.state";
import {Action, Store} from "@ngrx/store";
import {selectCartItems} from "../selectors/cart.selectors";


@Injectable()
export class CartEffects {
  constructor(
    private cartService: CartService,
    private actions$: Actions,
    private store: Store<IAppState>
  ) {}

  removeItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<RemoveCartItem>(ECartActions.RemoveCartItem),
      map((action) => action.payload),
      switchMap((product) => of(new RemoveCartItemSuccess(product.id)))
    );
  });

  addItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<AddCartItem>(ECartActions.AddCartItem),
      map((action) => action.payload),
      switchMap( (product) => of(new AddCartItemSuccess(product)))
    );
  });

  placeOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<PlaceOrder>(ECartActions.PlaceOrder),
      withLatestFrom(this.store.select(selectCartItems)),
      switchMap(([_, products]) => this.cartService.checkout(products)),
      switchMap(() => of(new PlaceOrderSuccess()))
    )
  });

  loadCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<LoadCartItems>(ECartActions.LoadCartItems),
      map(() => {
        let storageStr = sessionStorage.getItem('cart');
        if (storageStr === null ) {
            return [];
        }
        return JSON.parse(storageStr);
      }),
      switchMap((cartItems) => of(new LoadCartItemsSuccess(cartItems)))
    )
  });

  saveCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ECartActions.LoadCartItemsSuccess),
      switchMap(() => this.store),
      distinctUntilChanged(),
      tap((state) => sessionStorage.setItem('cart', JSON.stringify(state.cart.products))),
      switchMap(() => of(new SaveCartItemsSuccess()))
    )
  });

  ngrxOnInitEffects(): Action {
    return new LoadCartItems();
  }

}
