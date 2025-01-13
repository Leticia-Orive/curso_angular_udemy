import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private translateService= inject(TranslateService);

  public languages: string[] = ['es', 'en'];

  changeLang(language:string){
    this.translateService.use(language);
  }

}
