import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import {Product} from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = '/api/products';

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

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product)
      .pipe(
        catchError(this.handleError('addProduct', product))
      );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productsUrl}/${product.id}`, product)
      .pipe(
        catchError(this.handleError('updateProduct/', product))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
