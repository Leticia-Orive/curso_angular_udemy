import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../models/category.model';
import { AsyncPipe } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [AsyncPipe, MatCardModule, TranslateModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  private categoriesService = inject(CategoriesService);

  public categories$: Observable<ICategory[]> = this.categoriesService.getCategories();

}
