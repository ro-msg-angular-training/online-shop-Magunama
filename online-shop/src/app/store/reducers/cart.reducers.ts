import {IProductState} from "../state/product.state";
import {initialCartState} from "../state/cart.state";
import {CartActions, ECartActions} from "../actions/cart.actions";

export const cartReducers = (
  state = initialCartState,
  action: CartActions
): IProductState => {
  switch (action.type) {

    case ECartActions.RemoveCartItemSuccess: {
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.payload)
      };
    }

    case ECartActions.AddCartItem: {
      let oldProduct = state.products.find(prod => prod.id === action.payload.id);
      if (oldProduct === undefined) {
        return {
          ...state,
          products: state.products.concat({...action.payload, quantity: 1})
        };
      }

      return {
        ...state,
        products: state.products.map((prod) =>
          prod.id === action.payload.id ? {...prod, quantity: prod.quantity + 1} : prod
        )
      };

    }

    case ECartActions.PlaceOrderSuccess: {
      return {
        ...state,
        products: []
      };
    }

    case ECartActions.LoadCartItemsSuccess: {
      return {
        ...state,
        products: action.payload
      }
    }

    default:
      return state;
  }
};
