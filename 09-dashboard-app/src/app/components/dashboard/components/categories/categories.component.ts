import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetCategoriesAction } from '../../../../state/categories/categories.actions';
import { Observable } from 'rxjs';
import { IPage } from '../../../../models/page.model';
import { ICategory } from '../../../../models/category.model';
import { CategoriesState } from '../../../../state/categories/categories.state';
import { AsyncPipe } from '@angular/common';
import { TableDataComponent } from '../../../../shared/components/table-data/table-data.component';
import { IColumn } from '../../../../shared/components/table-data/models/column.model';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, AsyncPipe, TableDataComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  private store = inject(Store);

  // columnas
  public columns: IColumn[] = [
    {
      display: 'Nombre',
      property: 'name',
      canSort: true,
    },
    {
      display: 'Categoría padre',
      property: 'parent',
      canSort: true,
    },
    {
      display: 'Orden',
      property: 'order',
      canSort: true,
    }
  ]

// Parametros de busquedas
  private page =1;
  private sortBy = 'name';
  private sort = 'ASC';
  private searchText = '';

  // Obtener paginacion
  public pagination$: Observable<IPage<ICategory> | null> = this.store.select(CategoriesState.pagination)


  ngOnInit(){
    this.getCategories();
  }

 /**
   * Obtenemos las categorias paginadas
   */
  getCategories(){
    this.store.dispatch(new GetCategoriesAction({
      page: this.page,
      q: this.searchText,
      sortBy: this.sortBy,
      sort: this.sort,
    }))
  }
    

}
