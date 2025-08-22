import { Injectable } from '@angular/core';
import { InMemoryProductRepository } from '../../adapters/repositories/in-memory-product.repository';
import { GetAllProductsUseCase } from './get-all-products.usecase';


@Injectable({ providedIn: 'root' })
export class UseCaseProvider {
  productRepository = new InMemoryProductRepository();
  getAllProductsUseCase = new GetAllProductsUseCase(this.productRepository);
}
