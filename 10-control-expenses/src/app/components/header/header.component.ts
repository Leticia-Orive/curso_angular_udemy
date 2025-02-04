import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
// signals
  public isAuthenticatedSignal = this.authService.isAuthenticatedSignal;

  ngOnInit(){
    // comprobamos si estamos estamos
    this.authService.checkIsLogged();
  }

  /**
   *  Nos deslogueamos de la aplicación
   */
  logout(){
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login')

    });
  }

}
