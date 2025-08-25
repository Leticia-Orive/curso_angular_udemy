// Componente para el registro de nuevos usuarios (cliente o admin).
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/application/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role: 'cliente' | 'admin' = 'cliente';

  constructor(private router: Router, private auth: AuthService) {}

  register() {
    if (!this.name || !this.email || !this.password) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }
    if (this.auth.register(this.name, this.email, this.password, this.role)) {
      this.router.navigate(['/productos']);
    } else {
      alert('No se pudo registrar. Intenta con otro email.');
    }
  }
}
