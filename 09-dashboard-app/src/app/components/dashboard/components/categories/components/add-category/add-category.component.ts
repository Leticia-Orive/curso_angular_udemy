import { Component } from '@angular/core';
import { CategoryFormComponent } from '../../../../../../shared/components/category-form/category-form.component';
import { ICategory } from '../../../../../../models/category.model';


@Component({
  selector: 'app-add-category',
  imports: [CategoryFormComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  /**
   * Creamos una categoria
   * @param category 
   */
  createCategory(category: ICategory){
    console.log(category);
  }

}
