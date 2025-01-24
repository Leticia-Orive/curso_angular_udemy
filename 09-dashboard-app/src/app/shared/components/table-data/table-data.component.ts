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

  @Output() sortData = new EventEmitter<IColumn>();

  public selectedRows: boolean[] = [];
  public allChecked = false;

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
    this.columns = this.columns.map(col => ({
      ...col,
      sort: col.property !== column.property ? undefined : col.sort
    }))
    this.sortData.emit(column);
    
  }
  toggleSelectAll(){
    this.selectedRows = this.selectedRows.map(() => this.allChecked);
  }


}
