import { Product } from '../entities/product.entity';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  create(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}
