// Caso de uso para crear un producto en el repositorio (puede incluir imagen local).
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  execute(product: Product): Promise<void> {
    return this.productRepository.create(product);
  }
}
