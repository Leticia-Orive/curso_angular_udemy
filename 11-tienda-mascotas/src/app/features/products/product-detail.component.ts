import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UseCaseProvider } from '../../core/application/use-cases/use-case.provider';
import { Product } from '../../core/domain/entities/product.entity';
import { AuthService } from '../../core/application/services/auth.service';
import { CartUseCaseProvider } from '../../core/application/use-cases/cart-use-case.provider';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  product: Product | null = null;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private useCases: UseCaseProvider,
    public auth: AuthService,
    private cartUseCases: CartUseCaseProvider
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.useCases.getAllProductsUseCase.execute().then(products => {
        this.product = products.find(p => p.id === id) || null;
      });
    }
  }

  addToCart() {
    if (!this.product) return;
    const email = this.auth.getUserEmail();
    if (!email) {
      alert('Debes iniciar sesión para añadir al carrito');
      return;
    }
    this.cartUseCases.cartRepository.addItem(email, this.product.id, this.quantity).then(() => {
      alert('Producto agregado al carrito');
      const event = new CustomEvent('cartChanged');
      window.dispatchEvent(event);
    });
  }
}
