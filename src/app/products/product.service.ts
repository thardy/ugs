import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProduct} from './product.model';
import {Observable, of as observableOf} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Update} from '@ngrx/entity';

@Injectable()
export class ProductService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/api/products';
  }

  getProducts() {
    return this.http.get<IProduct[]>(this.baseUrl);
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl, product);
  }

  updateProduct(id: string | number, update: Partial<IProduct>): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.baseUrl}/${id}`, update);
  }

  deleteProduct(product: IProduct) {
    return this.http.delete(`${this.baseUrl}/${product.id}`)
      .pipe(
        map((result) => {
          return product;
        })
      );
  }

  // // test stuff
  // getTestCount() {
  //   return this.http.get<any>(`${this.baseUrl}/testCount/1`);
  // }
  //
  // updateTestCount(newCount: any) : Observable<any> {
  //   return this.http.put<any>(`${this.baseUrl}/testCount/1`, newCount)
  //     .pipe(
  //       map((testCount) => {
  //         return testCount.Count;
  //       })
  //     );
  // }
  //
  // incrementTestCount() {
  //   return this.getTestCount()
  //     .pipe(
  //       switchMap((testCount: any) => {
  //         const newTestCount = {
  //           id: 1,
  //           count: testCount.count += 1
  //         }
  //         return this.updateTestCount(newTestCount);
  //       })
  //     );
  // }
  //
  // decrementTestCount() {
  //   return this.getTestCount()
  //     .pipe(
  //       switchMap((testCount: any) => {
  //         const newTestCount = {
  //           id: 1,
  //           count: testCount.count -= 1
  //         }
  //         return this.updateTestCount(newTestCount);
  //       })
  //     );
  // }
}
