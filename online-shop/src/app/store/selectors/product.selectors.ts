import {createSelector} from "@ngrx/store";
import {IProductState} from "../state/product.state";
import {IAppState} from "../state/app.state";

const selectProducts = (state: IAppState) => state.products;

export const selectProductList = createSelector(
  selectProducts,
  (state: IProductState) => state.products
);

export const selectSelectedProduct = createSelector(
  selectProducts,
  (state: IProductState) => state.selectedProduct
);
