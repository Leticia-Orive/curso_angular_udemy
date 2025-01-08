import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslateModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  //cambiar idioma
  private translateService = inject(TranslateService);

  public languages: string[] = ['en', 'es'];
//cambiar idioma
  changeLanguage(language: string){
    this.translateService.use(language);
  }

}
