import {Action} from "@ngrx/store";
import {Product} from "../../model/product";

export enum ECartActions {
  LoadCartItems = '[Cart] Load Items',
  LoadCartItemsSuccess = '[Cart] Load Items Success',
  SaveCartItems = '[Cart] Save Items',
  SaveCartItemsSuccess = '[Cart] Save Items Success',
  RemoveCartItem = '[Cart] Remove Item',
  RemoveCartItemSuccess = '[Cart] Remove Item Success',
  AddCartItem = '[Cart] Add Item',
  AddCartItemSuccess = '[Cart] Add Item Success',
  PlaceOrder = '[Cart] Place Order',
  PlaceOrderSuccess = '[Cart] Place Order Success',
}

export class LoadCartItems implements Action {
  public readonly type = ECartActions.LoadCartItems;
}

export class LoadCartItemsSuccess implements Action {
  public readonly type = ECartActions.LoadCartItemsSuccess;
  constructor(public payload: Product[]) {}
}

export class SaveCartItems implements Action {
  public readonly type = ECartActions.SaveCartItems;
}

export class SaveCartItemsSuccess implements Action {
  public readonly type = ECartActions.SaveCartItemsSuccess;
}

export class RemoveCartItem implements Action {
  public readonly type = ECartActions.RemoveCartItem;
  constructor(public payload: Product) {}
}

export class RemoveCartItemSuccess implements Action {
  public readonly type = ECartActions.RemoveCartItemSuccess;
  constructor(public payload: number) {}
}

export class AddCartItem implements Action {
  public readonly type = ECartActions.AddCartItem;
  constructor(public payload: Product) {}
}

export class AddCartItemSuccess implements Action {
  public readonly type = ECartActions.AddCartItemSuccess;
  constructor(public payload: Product) {}
}

export class PlaceOrder implements Action {
  public readonly type = ECartActions.PlaceOrder;
}

export class PlaceOrderSuccess implements Action {
  public readonly type = ECartActions.PlaceOrderSuccess;
}

export type CartActions = LoadCartItems | LoadCartItemsSuccess
  | SaveCartItems | SaveCartItemsSuccess
  | RemoveCartItem | RemoveCartItemSuccess
  | AddCartItem | AddCartItemSuccess
  | PlaceOrder | PlaceOrderSuccess;


