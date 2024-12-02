import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Default to ProductsComponent
  { path: 'products', component: ProductsComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent }, // Pass product ID as a parameter
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '/products' },
];
