import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/application/services/auth.service';
import { CartUseCaseProvider } from './core/application/use-cases/cart-use-case.provider';
import { Cart } from './core/domain/entities/cart.entity';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html',
})
export class App {
  cartCount = 0;
  cart: Cart | null = null;

  constructor(public auth: AuthService, private cartUseCases: CartUseCaseProvider) {
    this.updateCartCount();
    window.addEventListener('cartChanged', () => this.updateCartCount());
  }

  updateCartCount() {
    if (!this.auth.isAuthenticated()) {
      this.cartCount = 0;
      return;
    }
    const email = this.auth.getUserEmail();
    if (!email) {
      this.cartCount = 0;
      return;
    }
    this.cartUseCases.cartRepository.getByUserId(email).then(cart => {
      this.cart = cart;
      this.cartCount = cart && cart.items ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;
    });
  }

  logout() {
    this.auth.logout();
    this.cartCount = 0;
    this.cart = null;
  }
}
