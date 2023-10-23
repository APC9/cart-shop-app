import { createAction, props } from '@ngrx/store';
import { Product } from '../interfaces/product.interface';

export const loadProducts = createAction( '[Product Component] load Product')

export const loadProductsSucces = createAction(
  '[Product Component] Load Products Succes',
  props<{ product: Product[] }>()
);

export const errorLoadProducts = createAction(
  '[Product Component] Error load Products',
  props<{ payload: any }>()
);

export const loadProductsInCart = createAction( '[Product Component] load Product In Cart',)




