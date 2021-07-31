import {Injectable} from "@angular/core";
import {ProductService} from "../../product.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  AddProduct, AddProductSuccess,
  DeleteProduct, DeleteProductSuccess,
  EProductActions,
  GetProduct,
  GetProducts,
  GetProductsSuccess,
  GetProductSuccess, UpdateProduct, UpdateProductSuccess
} from "../actions/product.actions";
import {map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class ProductEffects {
  constructor(
    private productService: ProductService,
    private actions$: Actions,
    private router: Router
  ) {}

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<GetProducts>(EProductActions.GetProducts),
      switchMap(() => this.productService.getProducts()),
      switchMap((products) => of(new GetProductsSuccess(products)))
    )
  });

  getProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<GetProduct>(EProductActions.GetProduct),
      map((action) => action.payload),
      switchMap((id) => this.productService.getProduct(id)),
      switchMap((product) => of(new GetProductSuccess(product)))
    )
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<DeleteProduct>(EProductActions.DeleteProduct),
      map((action) => action.payload),
      switchMap((id) => this.productService.deleteProduct(id).pipe(
        map(() => id))
      ),
      switchMap((id) => of(new DeleteProductSuccess(id)))
    );
  });

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<AddProduct>(EProductActions.AddProduct),
      map((action) => action.payload),
      switchMap((product) => this.productService.addProduct(product)),
      switchMap((product) => {
        this.router.navigate(['/products/', product.id]);
        return of(new AddProductSuccess(product))
      })
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<UpdateProduct>(EProductActions.UpdateProduct),
      map((action) => action.payload),
      switchMap((product) => this.productService.updateProduct(product).pipe(
        map(() => product))
      ),
      switchMap((product) => of(new UpdateProductSuccess(product)))
    );
  });

}
