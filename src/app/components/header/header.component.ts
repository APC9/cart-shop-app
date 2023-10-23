import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { Store } from '@ngrx/store';
import { productsState } from '../../store/products.reducer';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  viewCart: boolean = false;
  productsInCart: Product[] = [];

  private store = inject(Store<productsState>)

  ngOnInit(): void {
    this.store.select('products')
    .subscribe( ({ cart }) => {
      this.productsInCart = cart
    })
  }

  onToggleCart(){
    this.viewCart = !this.viewCart;
  }

}
