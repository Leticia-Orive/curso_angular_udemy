// Caso de uso para obtener todos los productos desde el repositorio (con imágenes locales).
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';

export class GetAllProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  execute(): Promise<Product[]> {
    return this.productRepository.getAll();
  }
}
