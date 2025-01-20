import { Component, inject } from '@angular/core';
import { ThemeDirective } from '../directives/theme.directive';
import { Theme } from '../../types';
import { Observable } from 'rxjs';
import { ICategory } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ThemeDirective, AsyncPipe, NgClass, NgTemplateOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private categoryService = inject(CategoriesService)

  public themeSelected = 'light';
  public categories$: Observable<ICategory[]> = this.categoryService.getCategoriesPublic()

  changeTheme(theme: Theme){
    this.themeSelected = theme;
  }

}
