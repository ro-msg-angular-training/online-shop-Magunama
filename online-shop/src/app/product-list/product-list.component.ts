import { Component, OnInit } from '@angular/core';

import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

import {ProductService} from "../product.service";
import {Product} from "../model/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faChevronRight = faChevronRight;

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}
