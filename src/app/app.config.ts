import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { productsReducer } from './store/products.reducer';
import { productsEffects } from './store/products.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore( { products: productsReducer}),
    provideEffects( productsEffects ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ]
};
