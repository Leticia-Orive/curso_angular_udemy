import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClearCategorySelectedAction, GetCategoryByIdAction, UpdateCategoryAction } from '../../../../../../state/categories/categories.actions';
import { CategoriesState } from '../../../../../../state/categories/categories.state';
import { Observable } from 'rxjs';
import { ICategory } from '../../../../../../models/category.model';
import { AsyncPipe  } from '@angular/common';
import { CategoryFormComponent } from '../../../../../../shared/components/category-form/category-form.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-category',
  imports: [AsyncPipe, CategoryFormComponent],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent {

  @Input() id!: string;

  private store = inject(Store)
  private toastrService = inject(ToastrService);
  private router = inject(Router)

  public category$: Observable<ICategory | null> = this.store.select(CategoriesState.categorySelected)


  ngOnInit(){
    console.log(this.id);
    this.store.dispatch(new GetCategoryByIdAction({id: this.id}))
  }
  updateCategory(category: ICategory){
    console.log(category);
    this.store.dispatch(new UpdateCategoryAction({ category })).subscribe({
      next: () => {
        this.toastrService.success(
          'Categoría actualizada',
          'Éxito'
        );
        // Volvemos a las categorias
        this.router.navigate(['/dashboard', 'categories'])
      }, error: (error) => {
        console.error(error);
        this.toastrService.error(
          'Error al actualizar la categoría',
          'Error'
        );
      }
    })
  }

  ngOnDestroy() {
    // Seleccionamos la categoria seleccionada
    this.store.dispatch(new ClearCategorySelectedAction());
   
  }

}
