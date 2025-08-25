// Proveedor de casos de uso para usuarios. Instancia el repositorio de usuarios.
import { Injectable } from '@angular/core';
import { InMemoryUserRepository } from '../../adapters/repositories/in-memory-user.repository';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class UserUseCaseProvider {
  userRepository: UserRepository = new InMemoryUserRepository();
}
