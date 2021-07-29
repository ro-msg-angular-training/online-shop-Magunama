import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {CartComponent} from "./cart/cart.component";
import {ProductEditorComponent} from "./product-editor/product-editor.component";

const routes: Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'products/editor', component: ProductEditorComponent},
  {path: 'products/:productId', component: ProductDetailsComponent},
  {path: 'products/editor/:productId', component: ProductEditorComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
