import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {faCartPlus, faHome} from "@fortawesome/free-solid-svg-icons";

import {ProductService} from "../../service/product.service";
import {Product} from '../../model/product';
import {CartService} from "../../service/cart.service";
import {AuthService} from "../../auth/auth.service";
import {IAppState} from "../../store/state/app.state";
import {select, Store} from "@ngrx/store";
import {selectSelectedProduct} from "../../store/selectors/product.selectors";
import {DeleteProduct, GetProduct} from "../../store/actions/product.actions";
import {AddCartItem} from "../../store/actions/cart.actions";
import {selectAuthIsAdmin, selectAuthIsCustomer} from "../../store/selectors/auth.selectors";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  faCartPlus = faCartPlus;
  faHome = faHome;

  productId !: number;
  product$ = this.store.pipe(select(selectSelectedProduct));

  isCustomer$ = this.store.pipe(select(selectAuthIsCustomer));
  isAdmin$ = this.store.pipe(select(selectAuthIsAdmin));

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private store: Store<IAppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.productId = Number(routeParams.get('productId'));

    // Find the product that corresponds with the id provided in route.
    this.store.dispatch(new GetProduct(this.productId));
  }

  delete(): void {
    if(confirm("Are you sure you want to remove this product?")) {
      this.store.dispatch(new DeleteProduct(this.productId));
      this.router.navigate(['/products/']);
    }
  }

  addToCart(product: Product): void {
    this.store.dispatch(new AddCartItem(product));
    alert("Added to cart!");
  }

}
