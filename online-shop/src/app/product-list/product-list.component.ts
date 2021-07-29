import { Component, OnInit } from '@angular/core';

import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

import {ProductService} from "../product.service";
import {Product} from "../model/product";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faChevronRight = faChevronRight;

  products: Product[] = [];

  isCustomer = this.authService.hasRole('customer');
  isAdmin = this.authService.hasRole('admin');

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}
