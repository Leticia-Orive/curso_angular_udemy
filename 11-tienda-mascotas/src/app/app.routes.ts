import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
	{ path: '', redirectTo: 'productos', pathMatch: 'full' },
	{ path: 'productos', loadComponent: () => import('./features/products/product-list.component').then(m => m.ProductListComponent) },
	{ path: 'productos/:id', loadComponent: () => import('./features/products/product-detail.component').then(m => m.ProductDetailComponent) },
		{ path: 'carrito', loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent), canActivate: [authGuard] },
		{ path: 'usuarios', loadComponent: () => import('./features/users/user-list.component').then(m => m.UserListComponent), canActivate: [authGuard] },
	{ path: 'login', loadComponent: () => import('./features/users/login.component').then(m => m.LoginComponent) },
	{ path: 'registro', loadComponent: () => import('./features/users/register.component').then(m => m.RegisterComponent) },
];
