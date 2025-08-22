import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = false;
  private userEmail: string | null = null;
  private userRole: 'cliente' | 'admin' | null = null;


  login(email: string, password: string): boolean {
    const userStr = localStorage.getItem('user:' + email);
    if (!userStr) return false;
    const user = JSON.parse(userStr);
    if (user.password === password) {
      this.isLoggedIn = true;
      this.userEmail = email;
      this.userRole = user.role || 'cliente';
      localStorage.setItem('auth', JSON.stringify({ email, role: this.userRole }));
      return true;
    }
    return false;
  }

  register(name: string, email: string, password: string, role: 'cliente' | 'admin' = 'cliente'): boolean {
    // Guardar usuario en memoria (simulado)
    // En un caso real, aquí se llamaría a un backend
    localStorage.setItem('user:' + email, JSON.stringify({ name, email, password, role }));
    this.isLoggedIn = true;
    this.userEmail = email;
    this.userRole = role;
    localStorage.setItem('auth', JSON.stringify({ email, role }));
    return true;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userEmail = null;
    this.userRole = null;
    localStorage.removeItem('auth');
  }

  isAuthenticated(): boolean {
    // Persistencia de sesión
    if (!this.isLoggedIn) {
      const authStr = localStorage.getItem('auth');
      if (authStr) {
        const auth = JSON.parse(authStr);
        this.userEmail = auth.email;
        this.userRole = auth.role;
        this.isLoggedIn = true;
      }
    }
    return this.isLoggedIn;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }

  getUserRole(): 'cliente' | 'admin' | null {
    return this.userRole;
  }
}
