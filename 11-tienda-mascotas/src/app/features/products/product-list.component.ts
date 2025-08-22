// Este componente muestra la lista de productos en una cuadrícula, incluyendo imágenes locales y controles para admin.
import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UseCaseProvider } from '../../core/application/use-cases/use-case.provider';
import { Product } from '../../core/domain/entities/product.entity';
import { AuthService } from '../../core/application/services/auth.service';
// ...existing code...

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private useCases: UseCaseProvider, public auth: AuthService) {
    this.useCases.getAllProductsUseCase.execute().then((products: Product[]) => this.products = products);
  }
}
