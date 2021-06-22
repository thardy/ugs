import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/reducers';
import {ProductActions} from './product.actions-typed';
import {isLoaded} from './product.selectors';

@Injectable()
export class ProductResolver implements Resolve<any> {

  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(isLoaded),
        tap((isLoaded) => {
          if (!this.loading && !isLoaded) {
            this.loading = true;
            this.store.dispatch(ProductActions.loadProducts());
          }
        }),
        filter(isLoaded => isLoaded),
        first(),
        finalize(() => this.loading = false),
      );
  }
}
