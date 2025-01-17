import { Component } from '@angular/core';
import { ThemeDirective } from '../directives/theme.directive';
import { Theme } from '../../types';

@Component({
  selector: 'app-header',
  imports: [ThemeDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public themeSelected = 'light';

  changeTheme(theme: Theme){
    this.themeSelected = theme;
  }

}
