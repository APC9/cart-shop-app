import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


import { Product } from 'src/app/interfaces/product.interface';
import { productsState } from '../../store/products.reducer';
import * as productsActions from 'src/app/store/products.actions';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy{

  products: Product[] = [];
  productsInCart : Product[] = [];

  private store = inject( Store<productsState>);
  private clearSubscriptions!: Subscription;
  private productService = inject(ProductService);

  ngOnInit(): void {

    this.clearSubscriptions = this.store.select('products')
    .subscribe( ({ products }) => {
      this.products = products
    })

    if( JSON.parse(localStorage.getItem('product')!) !== null){
      this.store.dispatch( productsActions.loadProductsInCart() )
    }
    this.store.dispatch( productsActions.loadProducts() )
  }

  ngOnDestroy(): void {
    this.clearSubscriptions.unsubscribe()
  }

  addProductToCart(product: Product){
    this.productService.addProductToCart(product)
  }
  
}
