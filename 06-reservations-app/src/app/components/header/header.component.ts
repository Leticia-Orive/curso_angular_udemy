import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslateModule, RouterLinkActive, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  //cambiar idioma
  private translateService = inject(TranslateService);
  private authService = inject(AuthService);

  public languages: string[] = ['en', 'es'];
  public isAutheticated$ = this.authService.isAutheticated$;
//cambiar idioma
  changeLanguage(language: string){
    this.translateService.use(language);
  }

}
