import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngrx/store';

import { Product } from '../interfaces/product.interface';
import { productsState } from '../store/products.reducer';
import * as productsActions from 'src/app/store/products.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://api.escuelajs.co/api/v1'
  private httpClient = inject(HttpClient);
  private store = inject( Store<productsState>);

  constructor() { }

  getAllProducts( limit: number = 10, offset: number = 0 ) {
    return this.httpClient.get<Product[]>( `${this.baseUrl}/products?limit=${limit}&offset=${offset}`)
  }

  addProductToCart(product: Product){
    const newProduct: Product = { ...product};
    let newProducts: Product[] = JSON.parse(localStorage.getItem('product')!) || []
    let productExists =  newProducts.find( elementAt => elementAt.id === newProduct.id )!

    if( newProducts.length === 0 || productExists === undefined){
      newProduct.amount = 1;
      newProducts.push( newProduct )
      localStorage.setItem('product', JSON.stringify(newProducts))
    }

    if( productExists ){
      const newListProduct = newProducts.filter( element => element.title !== productExists.title )
      productExists.amount  = productExists.amount + 1;
      newListProduct.push(productExists)
      localStorage.setItem('product', JSON.stringify(newListProduct))
    }

    this.store.dispatch( productsActions.loadProductsInCart() )
  }


  subtractProductFromCart( product: Product){
    const listProducts : Product[] = JSON.parse(localStorage.getItem('product')!) || []
    const productExists =  listProducts.find( elementAt => elementAt.id === product.id )!

    if( !productExists || productExists.amount <= 0 ) return


    const newListProduct = listProducts.filter( element => element.title !== productExists.title)
    productExists.amount = product.amount - 1;

    if( productExists.amount === 0 ){
      this.removeProductFromCart( productExists )
      return;
    };

    newListProduct.push( productExists )
    localStorage.setItem('product', JSON.stringify(newListProduct))
    this.store.dispatch( productsActions.loadProductsInCart() )
  }

  removeProductFromCart(product: Product){
    let listProducts : Product[] = JSON.parse(localStorage.getItem('product')!) || []
    listProducts = listProducts.filter( element => element.id !== product.id && product.amount !== 0 )

    if(listProducts.length < 0 ) return;
    localStorage.setItem('product', JSON.stringify(listProducts))
    this.store.dispatch( productsActions.loadProductsInCart() )
  }

}
