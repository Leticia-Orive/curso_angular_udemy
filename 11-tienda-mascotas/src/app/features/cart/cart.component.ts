// Componente para mostrar el carrito de compras, integrando productos e imágenes locales.
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartUseCaseProvider } from '../../core/application/use-cases/cart-use-case.provider';
import type { Cart, CartItem } from '../../core/domain/entities/cart.entity';
import { AuthService } from '../../core/application/services/auth.service';
import { UseCaseProvider } from '../../core/application/use-cases/use-case.provider';
import type { Product } from '../../core/domain/entities/product.entity';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  cart: Cart | null = null;
  products: Product[] = [];

  constructor(
    private cartUseCases: CartUseCaseProvider,
    public auth: AuthService,
    private useCases: UseCaseProvider
  ) {
    this.loadCart();
    this.loadProducts();
  }

  loadCart() {
    const email = this.auth.getUserEmail();
    if (!email) return;
    this.cartUseCases.cartRepository.getByUserId(email).then(cart => {
      this.cart = cart;
      // Si quieres notificar al menú, usa window.dispatchEvent(new CustomEvent('cartChanged'));
    });
  }

  loadProducts() {
    this.useCases.getAllProductsUseCase.execute().then(products => this.products = products);
  }

  getProduct(productId: string): Product | undefined {
    return this.products.find(p => p.id === productId);
  }

  removeItem(productId: string) {
    const email = this.auth.getUserEmail();
    if (!email) return;
    // Obtener el item actual
    const item = this.cart?.items.find(i => i.productId === productId);
    if (item && item.quantity > 1) {
      // Restar uno si hay más de uno
      this.cartUseCases.cartRepository.addItem(email, productId, -1).then(() => this.loadCart());
    } else {
      // Si solo queda uno, eliminar el item
      this.cartUseCases.cartRepository.removeItem(email, productId).then(() => this.loadCart());
    }
  }
}
