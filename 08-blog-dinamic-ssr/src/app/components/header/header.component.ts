import { Component, inject } from '@angular/core';
import { ThemeDirective } from '../../directives/theme.directive';
import { Theme } from '../../types';
import { CategoriesService } from '../../services/categories.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../models/category.model';
import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { HoverDirective } from '../../directives/hover.directive';
import { Router, RouterLink } from '@angular/router';
import { SlugifyPipe } from '../../pipes/slugify.pipe';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ThemeDirective, 
    AsyncPipe,
    NgClass, 
    NgTemplateOutlet, 
    HoverDirective, 
    SlugifyPipe, 
    RouterLink, 
    SearchComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [
    SlugifyPipe
  ]
})
export class HeaderComponent {

  private categoryService = inject(CategoriesService)
  private router = inject(Router)
  private slugifyPipe = inject(SlugifyPipe);

  // Theme inicial
  public themeSelected = 'light';
  // Obtenemos las categorias
  public categories$: Observable<ICategory[]> = this.categoryService.getCategoriesPublic()

  /**
   * Mostramos los posts de una categoria
   * @param category 
   */
  showPosts(category: ICategory){
    this.router.navigate(['category', category._id, this.slugifyPipe.transform(category.name)])
  }

  /**
   * Cambiamos de theme para mostrar el icono correcto
   * @param theme 
   */
  changeTheme(theme: Theme){
    this.themeSelected = theme;
  }

}
