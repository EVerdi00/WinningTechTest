import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { ProductListing } from './features/product-listing/product-listing';

export const routes: Routes = [
  { path: '', component: Home, title: 'WinningStore' },
  { path: 'products', component: ProductListing, title: 'Products | WinningStore' },
  { path: '**', redirectTo: '' }
];