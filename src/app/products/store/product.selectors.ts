import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductState, productsFeatureKey} from './product.reducers';
//import {selectProductState} from '../../products/store/rule.selectors';
import * as fromProducts from './product.reducers';

export const selectProductState = createFeatureSelector<ProductState>(productsFeatureKey);

export const selectAllProducts = createSelector(
  selectProductState,
  fromProducts.selectAll
);

export const underTenDollars = createSelector(
  selectAllProducts,
  products => products.filter(product => product.price <= 10.00)
);

export const isLoading = createSelector(
  selectProductState,
  state => state.loading
);

export const isLoaded = createSelector(
  selectProductState,
  state => state.loaded
);

export const testCount = createSelector(
  selectProductState,
  state => state.testCount
);
