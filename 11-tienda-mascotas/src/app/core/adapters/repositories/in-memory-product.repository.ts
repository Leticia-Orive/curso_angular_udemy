import { Injectable } from '@angular/core';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';


@Injectable({ providedIn: 'root' })
export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [
    { id: '1', name: 'Collar para perro', description: 'Collar ajustable para perros pequeños', price: 10, imageUrl: '', category: 'Accesorios' },
    { id: '2', name: 'Comida para gato', description: 'Alimento premium para gatos adultos', price: 20, imageUrl: '', category: 'Alimentos' }
  ];

  getAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  getById(id: string): Promise<Product | null> {
    const product = this.products.find(p => p.id === id) || null;
    return Promise.resolve(product);
  }

  create(product: Product): Promise<void> {
    this.products.push(product);
    return Promise.resolve();
  }

  update(product: Product): Promise<void> {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) this.products[index] = product;
    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    this.products = this.products.filter(p => p.id !== id);
    return Promise.resolve();
  }
}
