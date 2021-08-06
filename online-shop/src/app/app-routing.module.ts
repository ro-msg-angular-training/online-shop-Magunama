import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ProductListComponent} from "./component/product-list/product-list.component";
import {ProductDetailsComponent} from "./component/product-details/product-details.component";
import {CartComponent} from "./component/cart/cart.component";
import {ProductEditorComponent} from "./component/product-editor/product-editor.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard], data: {roles: ["customer"]}},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductListComponent, canActivate: [AuthGuard], data: {roles: ["user"]}},
  {path: 'products/editor', component: ProductEditorComponent, canActivate: [AuthGuard], data: {roles: ["admin"]}},
  {path: 'products/:productId', component: ProductDetailsComponent, canActivate: [AuthGuard], data: {roles: ["user"]}},
  {path: 'products/editor/:productId', component: ProductEditorComponent, canActivate: [AuthGuard], data: {roles: ["admin"]}},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
