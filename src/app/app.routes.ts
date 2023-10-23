import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'component',
        loadChildren: () => import('./components/components.routes').then( r => r.COMPONENTS_ROUTES )
      },
      {
        path: '',
        redirectTo: 'component',
        pathMatch: 'full',
      },
      {
        path: '**',
        loadComponent: () => import('./page-not-found/page-not-found.component').then( c => c.PageNotFoundComponent)
      },
    ]
  }
];
