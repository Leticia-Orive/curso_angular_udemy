import { Component, inject } from '@angular/core';
import { ThemeDirective } from '../../directives/theme.directive';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ThemeDirective,
    
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [
    
  ]
})
export class HeaderComponent {

 

  // Theme inicial
  public themeSelected = 'light';
 

  /**
   * Cambiamos de theme para mostrar el icono correcto
   * @param theme 
   */
  changeTheme(theme: string){
    this.themeSelected = theme;
  }

}