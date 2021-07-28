import { Component, OnInit } from '@angular/core';

import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

import {products} from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faChevronRight = faChevronRight;

  products = products;

  constructor() { }

  ngOnInit(): void {
  }

}
