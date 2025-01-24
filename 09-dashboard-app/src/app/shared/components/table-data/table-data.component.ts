import { Component, Input } from '@angular/core';
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

}
