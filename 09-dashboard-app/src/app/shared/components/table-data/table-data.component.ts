import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IColumn } from './models/column.model';

@Component({
  selector: 'app-table-data',
  imports: [],
  templateUrl: './table-data.component.html',
  styleUrl: './table-data.component.scss'
})
export class TableDataComponent<T extends { [key: string]: any}> {
  @Input() columns: IColumn[] = [];
  @Input() rows: T[] = [];

  @Output() sortData = new EventEmitter<IColumn>();


  /**
   * Enviamos la columna actualizada
   * @param column 
   * @param newSort 
   */
  sort(column: IColumn, newSort?: string){
    column.sort = newSort;
    this.columns = this.columns.map(col => ({
      ...col,
      sort: col.property !== column.property ? undefined : col.sort
    }))
    this.sortData.emit(column);
    
  }


}
