import { Routes } from '@angular/router';

export const COMPONENTS_ROUTES: Routes = [
  {
    path: '',
    children: [
/*       {
        path: 'cart',
        loadComponent: () => import('./cart/cart.component').then( c => c.CartComponent )
      }, */
/*       {
        path: 'product',
        loadComponent: () => import('./product/product.component').then( c => c.ProductComponent )
      }, */
      {
        path: 'main',
        loadComponent: () => import('./main/main.component').then( c => c.MainComponent )
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
    ]
  }
];
