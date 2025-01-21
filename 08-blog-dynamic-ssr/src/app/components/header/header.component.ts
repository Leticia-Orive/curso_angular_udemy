import { Component, inject } from '@angular/core';
import { ThemeDirective } from '../../directives/theme.directive';
import { Theme } from '../../types';
import { Observable } from 'rxjs';
import { ICategory } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HoverDirective } from '../../directives/hover.directive';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ThemeDirective,
    AsyncPipe,
    NgClass,
    NgTemplateOutlet,
    HoverDirective,
   
    
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [
    
    
  ]
})
export class HeaderComponent {
  private categoryService = inject(CategoriesService)

 

  // Theme inicial
  public themeSelected = 'light';
  // Obtenemos las categorias
  public categories$: Observable<ICategory[]> = this.categoryService.getCategoriesPublic()
 
 /**
   * Mostramos los posts de una categoria
   * @param category 
   */
 


  /**
   * Cambiamos de theme para mostrar el icono correcto
   * @param theme 
   */
  changeTheme(theme: Theme){
    this.themeSelected = theme;
  }



}