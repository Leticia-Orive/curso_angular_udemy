import { Component, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IFilter } from './models/filter.model';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/category.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FilterComponent),
    multi: true
  }]
})
export class FilterComponent implements ControlValueAccessor {

  private categoryService = inject(CategoryService)

  public categoriesPromise: Promise<ICategory[]> = this.categoryService.getCategories()

  private onChange: any = () => {}
  private onTouched = () => {}

  public filterForm: IFilter = {
    category: '',
    dateEnd: '',
    dateStart: ''
  }

  onFilter(){
    this.onChange(this.filterForm)
    this.onTouched();
  }

  writeValue(obj: IFilter): void {
    this.filterForm = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
