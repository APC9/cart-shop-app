import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { ProductService } from '../services/product.service';
import * as productActions from './products.actions';
import { Product } from '../interfaces/product.interface';


export class productsEffects{

  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadproducts$ = createEffect( () => this.actions$
    .pipe(
       ofType( productActions.loadProducts ),
       mergeMap( ()=> this.productService.getAllProducts()
          .pipe(
             map( (product: Product[]) => productActions.loadProductsSucces({product})),
             catchError( (error)=> of( productActions.errorLoadProducts({payload: error}) ) )
            ))
          )
       )


}


