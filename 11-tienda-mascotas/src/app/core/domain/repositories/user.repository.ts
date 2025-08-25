// Interfaz UserRepository. Define las operaciones CRUD para usuarios.
import { User } from '../entities/user.entity';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
