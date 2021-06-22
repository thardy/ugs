import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import * as fromProducts from './store/product.reducers';
import {ProductEffects} from './store/product.effects';
import {ProductResolver} from './store/product.resolver';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductService} from './product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductEditComponent,
    ProductDetailComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    StoreModule.forFeature(fromProducts.productsFeatureKey, fromProducts.reducers, { metaReducers: fromProducts.metaReducers }),
    EffectsModule.forFeature([ProductEffects]),
  ],
  providers: [
    ProductService,
    ProductResolver,
  ],
  exports: [
    ProductListComponent,
    ProductEditComponent,
    ProductDetailComponent,
    TestComponent
  ]
})
export class ProductsModule { }
