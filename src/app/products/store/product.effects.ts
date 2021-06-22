import {Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {ProductService} from '../product.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductActions} from './product.actions-typed';
import {concatMap, map, switchMap} from 'rxjs/operators';
import {IProduct} from '../product.model';
import {AppState} from '../../store/reducers';
import {Store} from '@ngrx/store';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ProductActions.loadProducts),
        switchMap(action => this.productService.getProducts()),
        map((products) => ProductActions.productsLoaded({products}))
      )
  );

  newProductSaved$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ProductActions.newProductSaved),
        switchMap(action => this.productService.createProduct(action.product)),
        map((product) => ProductActions.productCreated({product: product}))
      ),
  );

  existingProductSaved$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ProductActions.existingProductSaved),
        switchMap(action => this.productService.updateProduct(action.update.id, action.update.changes)),
        //map((product) => ProductActions.productUpdated({product: product}))
      ),
    {dispatch: false} // don't dispatch a new action
  );

  deleteProduct$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ProductActions.deleteProduct),
        switchMap(action => {
          return this.productService.deleteProduct(action.product);
        }),
        //map((product) => ProductActions.productDeleted({product: product}))
      ),
    {dispatch: false} // don't dispatch a new action
  );

  // test stuff
  incrementTestCount$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ProductActions.incrementTestCount),
        switchMap(action => {
          console.log(`effect working for incrementTestCount`)
          return observableOf(null)
        }),
        //map((product) => ProductActions.productUpdated({product: product}))
      ),
    {dispatch: false} // don't dispatch a new action
  );

  // test stuff
  decrementTestCount$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ProductActions.decrementTestCont),
        switchMap(action => {
          console.log(`effect working for decrementTestCount`)
          return observableOf(null)
        }),
        //map((product) => ProductActions.productUpdated({product: product}))
      ),
    {dispatch: false} // don't dispatch a new action
  );

  constructor(private actions$: Actions,
              private productService: ProductService,
  ) {}
}
