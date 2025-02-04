import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   *  Nos deslogueamos de la aplicación
   */
  logout(){
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login')

    });
  }

}
