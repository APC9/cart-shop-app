import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '../interfaces/product.interface';
import {  errorLoadProducts, loadProducts, loadProductsInCart, loadProductsSucces } from './products.actions';

export interface productsState{
  products: Product[];
  cart: Product[];
  error:    null
}

export const initialState: productsState = {
  products :  [],
  cart: [],
  error:      null
}

const _productsReducer = createReducer(
  initialState,
  on( loadProducts, (state) => ({ ...state }) ),
  on( loadProductsSucces, (state, { product }) => ({
     ...state,
     products: [ ...product]
    })
  ),
  on( errorLoadProducts, (state , {payload}) => ({
      ...state,
      error: payload,
    })
  ),
  on( loadProductsInCart, (state) =>{
    const newProduct =  JSON.parse(localStorage.getItem('product') || '');
    return{
    ...state,
    cart: [...newProduct]
    }
  }),

);

export function productsReducer(state: productsState | undefined, action: Action) {
  return _productsReducer(state, action);
};


