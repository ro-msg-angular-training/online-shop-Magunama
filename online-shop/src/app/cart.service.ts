import { Injectable } from '@angular/core';

import {Product} from "./model/product";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  orderUrl = '/api/orders';

  private products: Product[] = [];

  constructor(private http: HttpClient) {}

  loadStorage(): void {
    let storageStr = sessionStorage.getItem('cart');
    if (storageStr === null ) {
      this.products = [];
    } else {
      this.products = JSON.parse(storageStr);
    }
  }

  saveStorage(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.products));
  }

  addToCart(product: Product) {
    this.loadStorage();

    if (product.quantity === undefined) {
      product.quantity = 0;
    }

    let oldProduct = this.products.find(prod => prod.id === product.id);
    if (oldProduct === undefined) {
      product.quantity = 1;
      this.products.push(product);
    } else {
      oldProduct.quantity += 1;
    }

    this.saveStorage();
  }

  removeFromCart(product: Product) {
    this.loadStorage();

    const index = this.products.findIndex(prod => prod.id === product.id);
    if (index > -1) {
      this.products.splice(index, 1);
    }

    this.saveStorage();
  }

  checkout(): Observable<unknown> {
    const products = this.products;
    const order = {
      "customer": "doej",
      products
    };
    return this.http.post(this.orderUrl, order)
      .pipe(
        catchError(this.handleError('addOrder', order))
      );
  }

  emptyCart() {
    this.products = [];

    this.saveStorage();
  }

  getCart(): Product[] {
    this.loadStorage();

    return this.products;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
