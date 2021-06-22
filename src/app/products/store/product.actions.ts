import {createAction, props} from '@ngrx/store';
import {IProduct} from '../product.model';
import {Update} from '@ngrx/entity';

export const loadProducts = createAction('[Products Resolver] Load Products');
export const productsLoaded = createAction('[loadProducts Effect] Products Loaded', props<{products: IProduct[]}>());
export const newProductSaved = createAction('[Edit IProduct] New IProduct Saved', props<{product: IProduct}>());
export const productCreated = createAction('[newProductSaved Effect] IProduct Created', props<{product: IProduct}>());
export const existingProductSaved = createAction('[Edit IProduct] Existing IProduct Saved', props<{update: Update<IProduct>}>());
// todo: get rid of the optimistic crap and add these back in
export const productUpdated = createAction('[existingProductSaved Effect] IProduct Updated', props<{product: IProduct}>());
export const deleteProduct = createAction('[Products List] Delete IProduct', props<{product: IProduct}>());
export const productDeleted = createAction('[deleteProduct Effect] IProduct Deleted', props<{product: IProduct}>());


export const incrementTestCount = createAction('[Products List] Increment TestCount');
export const decrementTestCont = createAction('[Products List] Decrement TestCount');
