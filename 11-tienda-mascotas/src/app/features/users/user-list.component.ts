// Componente para mostrar la lista de usuarios. Solo accesible para administradores.
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUseCaseProvider } from '../../core/application/use-cases/user-use-case.provider';
import { User } from '../../core/domain/entities/user.entity';
import { AuthService } from '../../core/application/services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  users: User[] = [];

  constructor(private userUseCases: UserUseCaseProvider, public auth: AuthService) {
    this.userUseCases.userRepository.getAll().then(users => this.users = users);
  }
}
