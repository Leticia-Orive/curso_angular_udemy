import { booleanAttribute, Component, ContentChild, EventEmitter, Input, numberAttribute, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { IColumn } from './models/column.model';
import { FormsModule } from '@angular/forms';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { IAction, IActionSelected } from './models/action.model';
import { TSort } from './types/sort.type';

@Component({
  selector: 'app-table-data',
  imports: [FormsModule, NgClass, NgTemplateOutlet],
  templateUrl: './table-data.component.html',
  styleUrl: './table-data.component.scss'
})
export class TableDataComponent<T extends { [key: string]: any}, K extends string> {

  @ContentChild("templateRow") templateRow!: TemplateRef<any>;

  @Input() columns: IColumn[] = [];
  @Input() rows: T[] = [];
  @Input ({transform: booleanAttribute}) selectable = false; // Muestra los checkboxes para seleccionar filas
  @Input ({transform: booleanAttribute})  searchable = false; // Muestra o no el buscador
  @Input() placeholderSearch = '';
  @Input({transform: numberAttribute}) totalPages = 0;
  @Input({transform: numberAttribute}) currentPage = 1;
  @Input({ transform: numberAttribute }) totalElements = 0;
  @Input() actionsAvailables: IAction<K>[] = [];

  //eventos
  @Output() sortData = new EventEmitter<IColumn>();
  @Output() search = new EventEmitter<string>();
  @Output() selectPage = new EventEmitter<number>();
  @Output() selectRow = new EventEmitter<T>();
  @Output() selectAction = new EventEmitter<IActionSelected<T, K>>();
  @Output() noItemsSelected = new EventEmitter<void>();

  public selectedRows: boolean[] = [];// paginas seleccionadas
  public allChecked = false;
  public searchText = '';
  public pages: number[] = []; // paginas
  public actionSelected: IActionSelected<T, K> = {
    action: null,
    items: []
  }
  
  ngOnChanges(changes: SimpleChanges) {
    // Si cambian las filas, volvemos a generar selectedRows y pages
    if(changes['rows']){
      this.clearSelection()
      this.selectedRows = [...Array(this.rows.length)].map(value => false); 
      this.pages = [...Array(this.totalPages).keys()].map(key => key + 1);
    }
  }


  /**
   * Enviamos la columna actualizada
   * @param column 
   * @param newSort 
   */
  sort(column: IColumn, newSort?: TSort){
    column.sort = newSort;
     // reiniciamos el resto de columnas
    this.columns = this.columns.map(col => ({
      ...col,
      sort: col.property !== column.property ? undefined : col.sort
    }))
    this.sortData.emit(column);
    
  }
  /**
   * Seleccionamos/deseleccionados todos los elementos
   */
  toggleSelectAll(){
    this.selectedRows = this.selectedRows.map(() => this.allChecked);
  }
  /**
   * Enviamos el texto del buscado
   */
  searchData(){
    this.search.emit(this.searchText);
  }

  /**
   * Cambiamos la pagina
   * @param page 
   */
  changePage(page: number){
    this.clearSelection();
    this.currentPage = page;
    this.selectPage.emit(page);
  }

   /**
   * Enviamos la fila clickada
   * @param row 
   */
   chooseRow(row: T){
    this.selectRow.emit(row)
  }
  sendAction(){
    if(this.actionSelected.action){
      // Obtenemos los elementos seleccionados
      const selectedItems = this.rows.filter( (value, index) => this.selectedRows[index] )
      // Sino hay elementos seleccionados, emitimos un evento
      if(selectedItems.length == 0){
        this.noItemsSelected.emit();
        
      }else{
        // Seteamos los items y emitimos un evento
        this.actionSelected.items = selectedItems;
        this.selectAction.emit(this.actionSelected);
      }
    }    
  }

   /**
   * Limpiamos la seleccion de la tabla
   */
   clearSelection(){
    this.selectedRows = this.selectedRows.map(() => false)
  }
}
