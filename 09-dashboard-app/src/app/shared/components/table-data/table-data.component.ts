import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { IColumn } from './models/column.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-data',
  imports: [FormsModule],
  templateUrl: './table-data.component.html',
  styleUrl: './table-data.component.scss'
})
export class TableDataComponent<T extends { [key: string]: any}> {
  @Input() columns: IColumn[] = [];
  @Input() rows: T[] = [];
  @Input ({transform: booleanAttribute}) selectable = false; // Muestra los checkboxes para seleccionar filas
  @Input ({transform: booleanAttribute})  searchable = false; // Muestra o no el buscador
  @Input() placeholderSearch = '';

  //eventos
  @Output() sortData = new EventEmitter<IColumn>();
  @Output() search = new EventEmitter<string>();

  public selectedRows: boolean[] = [];
  public allChecked = false;
  public searchText = '';

  ngOnInit(){
    this.selectedRows = [...Array(this.rows.length)].map(value => false);
  }

  /**
   * Enviamos la columna actualizada
   * @param column 
   * @param newSort 
   */
  sort(column: IColumn, newSort?: string){
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



}
