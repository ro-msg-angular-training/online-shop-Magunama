import { Component, OnInit } from '@angular/core';
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Product} from "../products";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  faTrashAlt = faTrashAlt;

  products: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.products = this.cartService.getCart();
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.ngOnInit();
  }

  checkout(): void {
    if (this.products.length > 0) {
      this.cartService.checkout();
      this.cartService.emptyCart();
      alert("Order placed!");
    }
  }

}
