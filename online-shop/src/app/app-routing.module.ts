import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {CartComponent} from "./cart/cart.component";
import {ProductEditorComponent} from "./product-editor/product-editor.component";
import {UserAuthGuard} from "./auth/user-auth.guard";
import {LoginComponent} from "./auth/login/login.component";
import {AdminAuthGuard} from "./auth/admin-auth.guard";
import {CustomerAuthGuard} from "./auth/customer-auth.guard";

const routes: Routes = [
  {path: 'cart', component: CartComponent, canActivate: [CustomerAuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductListComponent, canActivate: [UserAuthGuard]},
  {path: 'products/editor', component: ProductEditorComponent, canActivate: [AdminAuthGuard]},
  {path: 'products/:productId', component: ProductDetailsComponent, canActivate: [UserAuthGuard]},
  {path: 'products/editor/:productId', component: ProductEditorComponent, canActivate: [AdminAuthGuard]},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
