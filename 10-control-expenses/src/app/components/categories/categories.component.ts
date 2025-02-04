import { Component } from '@angular/core';
import { DetailComponent } from '../../shared/detail/detail.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

@Component({
  selector: 'app-categories',
  imports: [DetailComponent, AddCategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  public showDetail: boolean = false;


/**
   * Abre el detalle para añadir la categoria
   */
  openDetail(){
    this.showDetail = true;
  }

  /**
   * Cierra el detalle, si la acción se completó, pedimos los datos de nuevo
   * @param actionSuccess 
   */
  closeDetail(){
    this.showDetail = false;
  }

}
