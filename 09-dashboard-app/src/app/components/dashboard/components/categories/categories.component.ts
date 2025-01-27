import { Component, inject } from '@angular/core';
import { RouterLink,  Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetCategoriesAction } from '../../../../state/categories/categories.actions';
import { Observable } from 'rxjs';
import { IPage } from '../../../../models/page.model';
import { ICategory } from '../../../../models/category.model';
import { CategoriesState } from '../../../../state/categories/categories.state';
import { AsyncPipe } from '@angular/common';
import { TableDataComponent } from '../../../../shared/components/table-data/table-data.component';
import { IColumn } from '../../../../shared/components/table-data/models/column.model';
import { IAction } from '../../../../shared/components/table-data/models/action.model';
import { TAction } from '../../../../types';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, AsyncPipe, TableDataComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  private store = inject(Store)
  private router = inject(Router)
  private route = inject(ActivatedRoute);

  
// columnas
  public columns: IColumn[] = [
    {
      display: 'Nombre',
      property: 'name',
      canSort: true,
      sort: 'ASC'
    },
    {
      display: 'Categoría padre',
      property: 'parent',
      canSort: true
    },
    {
      display: 'Orden',
      property: 'order',
      canSort: true
    }
  ]
  
  // acciones
  public actionsAvailables: IAction<TAction>[] = [
    {
      name: 'delete',
      display: 'Borrar'
    }
  ]


// Parametros de busquedas
  private page = 1;
  private sortBy = 'name'
  private sort: string | undefined = 'ASC'
  private searchText = ''

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
      sort: this.sort,
      sortBy: this.sortBy
    }))
  }
 /**
   * Modificamos la ordenación de la columna
   * @param column 
   */
  sortData(column: IColumn){
    this.sortBy = column.property
    this.sort = column.sort
    this.getCategories();
  }
/**
   * Modifica el texto a buscar
   * @param text 
   */
  search(text: string){
    this.searchText = text;
    this.getCategories();

  }
   /**
   * Cambiamos de pagina
   * @param page 
   */
   selectPage(page: number){
    this.page = page;
    this.getCategories();
  }
/**
   * Redirigimos a actualizar la categoria
   * @param category 
   */
selectRow(category: ICategory){
  this.router.navigate(['update', category._id], { relativeTo: this.route })
}

}
