import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {productsFeatureKey} from './products/store/product.reducer';
import {rulesFeatureKey} from './rules/store/rule.reducer';
import {RuleListComponent} from './rules/rule-list/rule-list.component';
import {EditorTestComponent} from './editor-test/editor-test.component';


const routes: Routes = [
  //{ path: '', redirectTo: 'rules', pathMatch: 'full' },
  {
    path: 'rules', component: RuleListComponent,
  },
  {
    path: 'editor-test', component: EditorTestComponent,
  },
  {
    path: productsFeatureKey,
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    // canActivate: [AuthGuard]
  },
  // removed because we are now eager-loading rules module
  // {
  //   path: rulesFeatureKey,
  //   loadChildren: () => import('./rules/rules.module').then(m => m.RulesModule),
  //   // canActivate: [AuthGuard]
  // },
  // {
  //   path: '**',
  //   redirectTo: '/'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
    //RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
