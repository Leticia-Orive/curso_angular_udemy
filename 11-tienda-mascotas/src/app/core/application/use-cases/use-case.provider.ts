// Proveedor de casos de uso para productos. Instancia repositorios y casos de uso.
import { Injectable } from '@angular/core';
import { InMemoryProductRepository } from '../../adapters/repositories/in-memory-product.repository';
import { GetAllProductsUseCase } from './get-all-products.usecase';


@Injectable({ providedIn: 'root' })
export class UseCaseProvider {
  productRepository = new InMemoryProductRepository();
  getAllProductsUseCase = new GetAllProductsUseCase(this.productRepository);
}
