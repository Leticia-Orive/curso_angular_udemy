// Proveedor de casos de uso para el carrito. Instancia el repositorio de carritos.
import { Injectable } from '@angular/core';
import { InMemoryCartRepository } from '../../adapters/repositories/in-memory-cart.repository';
import { CartRepository } from '../../domain/repositories/cart.repository';

@Injectable({ providedIn: 'root' })
export class CartUseCaseProvider {
  cartRepository: CartRepository = new InMemoryCartRepository();
}
