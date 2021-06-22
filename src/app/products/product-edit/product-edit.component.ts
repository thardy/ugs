import {Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IProduct, Product} from '../product.model';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {ProductActions} from '../store/product.actions-typed';
import {Update} from '@ngrx/entity';
import {AppState} from '../../store/reducers';

@Component({
  selector: 'ugs-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductEditComponent implements OnInit {
  @Input() product: IProduct;
  @Input() mode: 'create' | 'update';
  @Output() formClosed = new EventEmitter();
  form: FormGroup;
  dialogTitle: string;
  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
    const formControls = {
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
    };

    if (this.mode === 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({...this.product});
    }
    else if (this.mode === 'create') {
      this.form = this.fb.group({
        ...formControls
      });
    }
  }

  onCancel() {
    this.formClosed.emit();
  }

  onSave() {
    const mergedProduct: IProduct = {
      ...this.product,
      ...this.form.value
    };

    const product = new Product(mergedProduct);
    const serializableProduct = {...product}; // ngRx does not allow objects with their own constructors when strict serializability is turned on!!!!!

    const update: Update<IProduct> = {
      id: product.id,
      changes: serializableProduct
    };

    if (this.mode === 'create') {
      this.store.dispatch(ProductActions.newProductSaved({product: serializableProduct}));
    }
    else if (this.mode === 'update') {
      this.store.dispatch(ProductActions.existingProductSaved({update}));
    }

    this.formClosed.emit();
  }

}

