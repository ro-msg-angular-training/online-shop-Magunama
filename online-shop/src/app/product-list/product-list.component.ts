import { Component, OnInit } from '@angular/core';

import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

import {AuthService} from "../auth/auth.service";
import {IAppState} from "../store/state/app.state";
import {select, Store} from "@ngrx/store";
import {GetProducts} from "../store/actions/product.actions";
import {selectProductList} from "../store/selectors/product.selectors";
import {selectAuthIsAdmin, selectAuthIsCustomer} from "../store/selectors/auth.selectors";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faChevronRight = faChevronRight;

  products$ = this.store.pipe(select(selectProductList));

  isCustomer$ = this.store.pipe(select(selectAuthIsCustomer));
  isAdmin$ = this.store.pipe(select(selectAuthIsAdmin));

  constructor(
    private authService: AuthService,
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.store.dispatch(new GetProducts());
  }
}
