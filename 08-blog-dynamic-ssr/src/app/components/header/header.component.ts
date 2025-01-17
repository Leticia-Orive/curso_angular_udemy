import { Component } from '@angular/core';
import { ThemeDirective } from '../directives/theme.directive';

@Component({
  selector: 'app-header',
  imports: [ThemeDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public themeSelected = 'light';

  changeTheme(theme: string){
    this.themeSelected = theme;
  }

}
