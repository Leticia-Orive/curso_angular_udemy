// Se agregaron imágenes locales a los productos usando archivos de public/img.
// También se añadieron más productos con sus imágenes correspondientes.
import { Injectable } from '@angular/core';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';


@Injectable({ providedIn: 'root' })
export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [
    {
      id: '1',
      name: 'Collar para perro',
      description: 'Collar ajustable para perros pequeños',
      price: 10,
      imageUrl: 'img/collar_perros.jpg',
      category: 'Accesorios'
    },
    {
      id: '2',
      name: 'Comida para gato',
      description: 'Alimento premium para gatos adultos',
      price: 20,
      imageUrl: 'img/comida_gatos.jpg',
      category: 'Alimentos'
    },
    {
      id: '3',
      name: 'Comida para perro',
      description: 'Alimento balanceado para perros',
      price: 22,
      imageUrl: 'img/comida_perros.jpg',
      category: 'Alimentos'
    },
    {
      id: '4',
      name: 'Cama para mascota',
      description: 'Cama cómoda para perros y gatos',
      price: 35,
      imageUrl: 'img/cama.jpg',
      category: 'Accesorios'
    },
    {
      id: '5',
      name: 'Caseta para perro',
      description: 'Caseta resistente para exteriores',
      price: 80,
      imageUrl: 'img/caseta.jpg',
      category: 'Accesorios'
    },
    {
      id: '6',
      name: 'Correa para perro',
      description: 'Correa resistente y cómoda',
      price: 15,
      imageUrl: 'img/correa.jpg',
      category: 'Accesorios'
    },
    {
      id: '7',
      name: 'Comedero doble',
      description: 'Comedero doble para agua y comida',
      price: 18,
      imageUrl: 'img/comederos.jpg',
      category: 'Accesorios'
    },
    {
      id: '8',
      name: 'Bozal para perro',
      description: 'Bozal seguro y ajustable',
      price: 12,
      imageUrl: 'img/bozal.jpg',
      category: 'Accesorios'
    }
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
