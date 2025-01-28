import { Component, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CategoriesState } from '../../../state/categories/categories.state';
import { GetAllCategoriesAction } from '../../../state/categories/categories.actions';

@Component({
  selector: 'app-select-category',
  imports: [],
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCategoryComponent),
      multi: true
    }
  ]
})
export class SelectCategoryComponent implements ControlValueAccessor {

  
  private store = inject(Store)

  public value: string = ''; 
  //Obtener las categorias
  public categories$ = this.store.select(CategoriesState.allCategories);

  //Creamos unas funciones
  private onChange = (value: string) => {};
  private onTouch = () => {};


  ngOnInit(){
    //Llamos a la acción 
    this.store.dispatch(new GetAllCategoriesAction())
  }







  writeValue(value:string): void {
    this.value = value;
  }

  //estos los dos los vamos a ver siempre asi 
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  
  


}
