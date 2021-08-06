import {Product} from "../../model/product";

export interface ICartState {
  products: Product[];
}

export const initialCartState: ICartState = {
  products: []
};
