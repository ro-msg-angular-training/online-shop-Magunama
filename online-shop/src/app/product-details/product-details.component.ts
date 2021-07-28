import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {faCartPlus} from "@fortawesome/free-solid-svg-icons";

import {ProductService} from "../product.service";
import {Product} from '../products';
import {CartService} from "../cart.service";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  faCartPlus = faCartPlus;

  product: Product|undefined;
  productId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.productId = Number(routeParams.get('productId'));
    this.loadProduct();
  }

  loadProduct(): void {
    // Find the product that correspond with the id provided in route.
    this.productService.getProduct(this.productId).subscribe(product => this.product = product);
  }

  delete(): void {
    // todo: add confirmation dialog
    this.productService.deleteProduct(this.productId).subscribe();
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
    alert("Added to cart!");
  }

}
