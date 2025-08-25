// Repositorio en memoria para usuarios. Simula operaciones CRUD sin backend real.
import { Injectable } from '@angular/core';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable({ providedIn: 'root' })
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [
    { id: '1', name: 'Leticia', email: 'leticia@email.com', address: 'Calle Falsa 123' }
  ];

  getAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  getById(id: string): Promise<User | null> {
    const user = this.users.find(u => u.id === id) || null;
    return Promise.resolve(user);
  }

  create(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }

  update(user: User): Promise<void> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) this.users[index] = user;
    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    this.users = this.users.filter(u => u.id !== id);
    return Promise.resolve();
  }
}
