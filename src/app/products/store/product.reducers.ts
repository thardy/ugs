import {createReducer, MetaReducer, on, State} from '@ngrx/store';
import {compareProducts, IProduct} from '../product.model';
import {ProductActions} from './product.actions-typed';
import * as _ from 'lodash-es'
import {environment} from '../../../environments/environment';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export const productsFeatureKey = 'products';

export interface ProductState extends EntityState<IProduct> {
  loading: boolean,
  loaded: boolean,
  testCount: number
}

export const adapter = createEntityAdapter<IProduct>({
  sortComparer: compareProducts,
  // selectId: product => product.productId // this is where you would override id if it is not 'id'
});

export const initialState: ProductState = adapter.getInitialState({
  loading: false,
  loaded: false,
  testCount: 0,
});

export const reducers = createReducer(
  initialState,

  on(ProductActions.loadProducts,
    (state, action) => {
      return {
        ...state,
        loading: true,
      }
    }),

  on(ProductActions.productsLoaded,
    (state, action) => {
      return adapter.setAll(
        action.products,
        {...state, loading: false, loaded: true});
    }),

  on(ProductActions.productCreated,
    (state, action) => {
      return adapter.addOne(action.product, state);
    }),

  // we are taking an optimistic approach to UX updates - changing the UX before the back-end completes the update
  //  if we didn't want to be optimistic, we could have a ProductActions.productUpdated and subscribe to that instead
  on(ProductActions.existingProductSaved,
    (state, action) => {
      return adapter.updateOne(action.update, state);
    }),

  on(ProductActions.deleteProduct,
    (state, action) => {
      return adapter.removeOne(action.product.id, state);
    }),

  on(ProductActions.incrementTestCount,
    (state, action) => {
      return {
        ...state,
        testCount: state.testCount + 1
      }
    }),
  on(ProductActions.decrementTestCont,
    (state, action) => {
      return {
        ...state,
        testCount: state.testCount - 1
      }
    }),
);

export const {
  selectAll
} = adapter.getSelectors();

export const metaReducers: MetaReducer<ProductState>[] = !environment.production ? [] : [];
