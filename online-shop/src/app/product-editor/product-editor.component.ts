import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../model/product";
import {IAppState} from "../store/state/app.state";
import {select, Store} from "@ngrx/store";
import {selectSelectedProduct} from "../store/selectors/product.selectors";
import {AddProduct, GetProduct, UpdateProduct} from "../store/actions/product.actions";


enum EditorMode {
  CREATE,
  EDIT
}

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {
  productId : number | undefined;
  product$ = this.store.pipe(select(selectSelectedProduct));

  mode: EditorMode = EditorMode.CREATE;

  productForm = this.formBuilder.group({
    id : [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required]],
    imageUrl: [''],
    price: ['', [Validators.required, Validators.pattern("^\\d+\\.?\\d*$")]],
    description: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const ret = routeParams.get('productId');
    if (ret !== null) {
      this.mode = EditorMode.EDIT;
      this.productId = Number(ret);
      this.loadProduct();
    }
  }

  loadProduct(): void {
    this.store.dispatch(new GetProduct(this.productId!));
    this.product$.subscribe(product => {
      if (product) {
        this.initializeForm(product);
      }
    });
  }

  initializeForm(product: Product): void {
    this.productForm.patchValue({
        id: product.id,
        name: product.name,
        category: product.category,
        imageUrl: product.imageUrl,
        price: product.price,
        description: product.description
    });
  }

  submitForm(): void {
    const product = this.productForm.value as Product;

    if (this.mode === EditorMode.CREATE) {
      this.store.dispatch(new AddProduct(product));
    } else {
      this.store.dispatch(new UpdateProduct(product));
      this.router.navigate(['/products/', product.id]);
    }
  }

}
