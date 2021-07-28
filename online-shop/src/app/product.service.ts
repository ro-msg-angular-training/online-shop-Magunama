import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import {Product} from "./products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://localhost:3000/products';
  // private productsUrl = '/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  deleteProduct(id: number): Observable<unknown> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete(url).pipe(
        catchError(this.handleError('deleteProduct'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
