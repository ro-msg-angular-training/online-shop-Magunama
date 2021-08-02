import { Component, OnInit } from '@angular/core';
import {faTrashAlt, faHome} from "@fortawesome/free-solid-svg-icons";
import {Product} from "../model/product";
import {CartService} from "../cart.service";
import {select, Store} from "@ngrx/store";
import {IAppState} from "../store/state/app.state";
import {LoadCartItems, PlaceOrder, RemoveCartItem} from "../store/actions/cart.actions";
import {selectCartItems} from "../store/selectors/cart.selectors";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faHome = faHome;

  cartItems$ = this.store.pipe(select(selectCartItems));

  constructor(
    private cartService: CartService,
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.store.dispatch(new LoadCartItems());
  }

  removeFromCart(product: Product): void {
    this.store.dispatch(new RemoveCartItem(product))
  }

  checkout(products: Product[]): void {
    if (products.length > 0) {
      this.store.dispatch(new PlaceOrder());
      alert("Order placed!");
    }
  }

}
