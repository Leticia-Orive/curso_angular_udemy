import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/application/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router, private auth: AuthService) {}

  login() {
    if (!this.email || !this.password) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }
    if (this.auth.login(this.email, this.password)) {
      this.router.navigate(['/productos']);
    } else {
      alert('El email o la contraseña no son correctos.');
    }
  }

  recoverPassword() {
    if (!this.email) {
      alert('Introduce tu email para recuperar la contraseña.');
      return;
    }
    const userStr = localStorage.getItem('user:' + this.email);
    if (userStr) {
      const user = JSON.parse(userStr);
      alert('Tu contraseña es: ' + user.password);
    } else {
      alert('No existe un usuario registrado con ese email.');
    }
  }
}
