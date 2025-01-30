import { Component, inject } from '@angular/core';
import { RouterLink,  Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { DeleteCategoriesAction, GetCategoriesAction } from '../../../../state/categories/categories.actions';
import { Observable } from 'rxjs';
import { IPage } from '../../../../models/page.model';
import { ICategory } from '../../../../models/category.model';
import { CategoriesState } from '../../../../state/categories/categories.state';
import { AsyncPipe } from '@angular/common';
import { TableDataComponent } from '../../../../shared/components/table-data/table-data.component';
import { IColumn } from '../../../../shared/components/table-data/models/column.model';
import { IAction, IActionSelected } from '../../../../shared/components/table-data/models/action.model';
import { TAction } from '../../../../types';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../../../shared/components/modal/services/modal.service';
import { IModal } from '../../../../shared/components/modal/models/modal.model';
import { TSort } from '../../../../shared/components/table-data/types/sort.type';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, AsyncPipe, TableDataComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  providers:[ModalService]

})
export class CategoriesComponent {

  private store = inject(Store)
  private router = inject(Router)
  private route = inject(ActivatedRoute);
  private toastrService = inject(ToastrService)
  private ModalService = inject(ModalService)

  
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
  private sort?: TSort = 'ASC'
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
 
  /**
   * Recibimos una acción y la ejecutamos
   * @param actionSelected 
   */
  selectAction(actionSelected: IActionSelected<ICategory, TAction>){
    switch(actionSelected.action){
      case 'delete':

        // info del modal a mostrar
        const modal: IModal = {
          content: '¿Estas seguro de querer borrar las categorías?'
        }

        // Mostramos el modal, si le damos a aceptar, entramos en next
        this.ModalService.open(modal).subscribe({
          next: () => {
            // obtenemos los ids de las categorias
            const ids = actionSelected.items.map( (category: ICategory) => category._id! )
            // Borramos las categorias
            this.deleteCategories(ids);
          }
        })
 
        break;
    }
  }

  /**
   * Evento al no seleccionar elementos
   */
  noItemsSelected(){
    this.toastrService.error(
      'Debes seleccionar categorias',
      'Error'
    )
  }
   deleteCategories(ids: string[]){

    this.store.dispatch(new DeleteCategoriesAction({ ids })).subscribe({
      next: () => {
        
        this.toastrService.success(
          'Categorías eliminadas',
          'Éxito'
        )

        // Obtengo la paginacion actual
        const pagination = this.store.selectSnapshot(CategoriesState.pagination);

        // Si la pagina es diferente de 1 y hemos eliminado toda la pagina, echamos una pagina hacia atras
        if(this.page !== 1 && pagination?.content.length === ids.length){
          this.page = this.page - 1;
        }

        // Refrescamos
        this.getCategories();
      }, error: (error) =>{
        console.error(error);
        this.toastrService.error(
          'Error al borrar categorías',
          'Error'
        )
      }
    })

  }

}
