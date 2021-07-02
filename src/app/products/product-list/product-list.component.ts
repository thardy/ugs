import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IProduct} from '../product.model';
import {Observable} from 'rxjs';
import {isLoading, selectAllProducts} from '../store/product.selectors';
import {select, Store} from '@ngrx/store';
import {testCount} from '../store/product.selectors';
import {AppState} from '../../store/reducers';
import {ProductActions} from '../store/product.actions-typed';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'ugs-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  products$: Observable<IProduct[]>;
  loading$: Observable<boolean>;
  testCount$: Observable<number>;
  editing = false;
  adding = false;
  selectedProduct: IProduct;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.products$ = this.store
      .pipe(
        select(selectAllProducts)
      );

    this.loading$ = this.store
      .pipe(
        select(isLoading),
        tap((isLoading) => {
          console.log(`products loading changed to ${isLoading}`)
        })
      );
    this.loading$.subscribe();


    this.testCount$ = this.store.pipe(select(testCount));
  }

  onEdit(product: IProduct) {
    this.selectedProduct = {...product};
    this.editing = true;
  }

  onAdd() {
    this.adding = true;
  }

  onDelete(product: IProduct) {
    // can't pass typed objects with their own constructors through ngRx because it violates strict serializability
    //  translating to a raw object using spread operator is MANDATORY when dealing with typed object with custom constructors
    this.store.dispatch(ProductActions.deleteProduct({product: {...product}}));
  }

  onFormClosed() {
    this.selectedProduct = null;
    this.editing = false;
    this.adding = false;
  }

  onTestButton1() {
    this.store.dispatch(ProductActions.incrementTestCount());
  }

  onTestButton2() {
    this.store.dispatch(ProductActions.decrementTestCont());
  }
}
