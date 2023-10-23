import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/interfaces/product.interface';
import { Store } from '@ngrx/store';
import { productsState } from 'src/app/store/products.reducer';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  productsInCart: Product[] = [];
  private store = inject( Store<productsState>);
  private productService = inject(ProductService);

  ngOnInit(): void {
   this.store.select('products')
    .subscribe( ({ cart }) => {
      this.productsInCart = cart
    })
  }

  subtractProductFromCart( product: Product){
    this.productService.subtractProductFromCart(product)
  }

  addProductToCart(product: Product){
    this.productService.addProductToCart(product)
  }

  removeProductFromCart(product: Product){
    this.productService.removeProductFromCart(product)
  }


}

/* if( newProducts.length === 0 || productExists === undefined){
  newProduct.amount = 1;
  newProducts.push( newProduct )
  localStorage.setItem('product', JSON.stringify(newProducts))
} */
