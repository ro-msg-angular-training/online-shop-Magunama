import {Action} from "@ngrx/store";
import {Product} from "../../model/product";

export enum EProductActions {
  GetProducts = '[Product] Get Products',
  GetProductsSuccess = '[Product] Get Products Success',
  GetProduct = '[Product] Get Product',
  GetProductSuccess = '[Product] Get Product Success',
  DeleteProduct = '[Product] Delete Product',
  DeleteProductSuccess = '[Product] Delete Product Success',
  AddProduct = '[Product] Add Product',
  AddProductSuccess = '[Product] Add Product Success',
  UpdateProduct = '[Product] Update Product',
  UpdateProductSuccess = '[Product] Update Product Success'
}

export class GetProducts implements Action {
  public readonly type = EProductActions.GetProducts;
}

export class GetProductsSuccess implements Action {
  public readonly type = EProductActions.GetProductsSuccess;
  constructor(public payload: Product[]){}
}

export class GetProduct implements Action {
  public readonly type = EProductActions.GetProduct;
  constructor(public payload: number) {}
}

export class GetProductSuccess implements Action {
  public readonly type = EProductActions.GetProductSuccess;
  constructor(public payload: Product) {}
}

export class DeleteProduct implements Action {
  public readonly type = EProductActions.DeleteProduct;
  constructor(public payload: number) {}
}

export class DeleteProductSuccess implements Action {
  public readonly type = EProductActions.DeleteProductSuccess;
  constructor(public payload: number) {}
}

export class AddProduct implements Action {
  public readonly type = EProductActions.AddProduct;
  constructor(public payload: Product) {}
}

export class AddProductSuccess implements Action {
  public readonly type = EProductActions.AddProductSuccess;
  constructor(public payload: Product) {}
}

export class UpdateProduct implements Action {
  public readonly type = EProductActions.UpdateProduct;
  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  public readonly type = EProductActions.UpdateProductSuccess;
  constructor(public payload: Product) {}
}

export type ProductActions = GetProducts | GetProductsSuccess
  | GetProduct | GetProductSuccess
  | DeleteProduct | DeleteProductSuccess
  | AddProduct | AddProductSuccess
  | UpdateProduct | UpdateProductSuccess;


