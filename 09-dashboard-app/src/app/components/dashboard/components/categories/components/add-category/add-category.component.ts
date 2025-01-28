import { Component, inject } from '@angular/core';
import { CategoryFormComponent } from '../../../../../../shared/components/category-form/category-form.component';
import { ICategory } from '../../../../../../models/category.model';
import { Store } from '@ngxs/store';
import { CreateCategoryAction } from '../../../../../../state/categories/categories.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-category',
  imports: [CategoryFormComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  private store = inject(Store);
  private toastrService = inject(ToastrService);
  private router = inject(Router);
  /**
   * Creamos una categoria
   * @param category 
   */
  createCategory(category: ICategory){
    console.log(category);
    this.store.dispatch(new CreateCategoryAction({category})).subscribe({
      next: () => {
        this.toastrService.success(
          'Categoria añadida correctamente',
          'Exito'
        );
        // Volvemos a las categorias
        this.router.navigate(['/dashboard', 'categories']);
      }, error: (error) => {
        console.log(error);
        this.toastrService.error(
          'Ha ocurrido un error al añadir la categoria',
          'Error'
        );

      }
    });
  }

}
