import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProductResolver} from './product.resolver';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {TestComponent} from './test/test.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: {
      products: ProductResolver
    }
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: ':productId',
    component: ProductDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
