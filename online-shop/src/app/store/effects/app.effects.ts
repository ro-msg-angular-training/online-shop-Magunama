import {AuthEffects} from "./auth.effects";
import {ProductEffects} from "./product.effects";
import {CartEffects} from "./cart.effects";

export const appEffects: Array<any> = [
  AuthEffects,
  ProductEffects,
  CartEffects
];
