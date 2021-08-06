import {Product} from "../../model/product";

export interface IProductState {
  products: Product[];
  selectedProduct?: Product;
}

export const initialProductState: IProductState = {
  products: [],
  selectedProduct: undefined
};
