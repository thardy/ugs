import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {productsFeatureKey} from './products/store/product.reducers';

const routes: Routes = [
  {
    path: productsFeatureKey,
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    // canActivate: [AuthGuard]
  },
  // {
  //   path: '**',
  //   redirectTo: '/'
  // }
];

@NgModule({
  imports: [
    //RouterModule.forRoot(routes, { enableTracing: true })
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
