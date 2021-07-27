import { Component, OnInit } from '@angular/core';

import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faChevronRight = faChevronRight;

  products = [
    {
      "category": "phone",
      "name": "Phone X",
      "price": 200.0,
    },
    {
      "category": "phone",
      "name": "Phone Y",
      "price": 350.0,
    },
    {
      "category": "tv",
      "name": "Tv 1",
      "price": 260.0
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
