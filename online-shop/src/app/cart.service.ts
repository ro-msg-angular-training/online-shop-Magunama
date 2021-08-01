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

  constructor(private http: HttpClient) {}

  checkout(username: any, products: Product[]): Observable<unknown> {
    const order = {
      "customer": username,
      "products": products.map((prod) => {
        return {
          productId: prod.id,
          quantity: prod.quantity
        }
      })
    };
    return this.http.post(this.orderUrl, order, {responseType: 'text'})
      .pipe(
        catchError(this.handleError('addOrder', order))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
