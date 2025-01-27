import { booleanAttribute, Component, ContentChild, EventEmitter, Input, numberAttribute, Output, TemplateRef } from '@angular/core';
import { IColumn } from './models/column.model';
import { FormsModule } from '@angular/forms';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-table-data',
  imports: [FormsModule, NgClass, NgTemplateOutlet],
  templateUrl: './table-data.component.html',
  styleUrl: './table-data.component.scss'
})
export class TableDataComponent<T extends { [key: string]: any}> {

  @ContentChild("templateRow") templateRow!: TemplateRef<any>;

  @Input() columns: IColumn[] = [];
  @Input() rows: T[] = [];
  @Input ({transform: booleanAttribute}) selectable = false; // Muestra los checkboxes para seleccionar filas
  @Input ({transform: booleanAttribute})  searchable = false; // Muestra o no el buscador
  @Input() placeholderSearch = '';
  @Input({transform: numberAttribute}) totalPages = 0;
  @Input({transform: numberAttribute}) currentPage = 1;
  @Input({ transform: numberAttribute }) totalElements = 0;

  //eventos
  @Output() sortData = new EventEmitter<IColumn>();
  @Output() search = new EventEmitter<string>();
  @Output() selectPage = new EventEmitter<number>();
  @Output() selectRow = new EventEmitter<T>();

  public selectedRows: boolean[] = [];// paginas seleccionadas
  public allChecked = false;
  public searchText = '';
  public pages: number[] = []; // paginas

  ngOnInit(){
    this.selectedRows = [...Array(this.rows.length)].map(value => false);
    this.pages = [...Array(this.totalPages).keys()].map(key => key + 1);
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

  /**
   * Cambiamos la pagina
   * @param page 
   */
  changePage(page: number){
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



}
