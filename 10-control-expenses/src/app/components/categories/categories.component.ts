import { Component, inject } from '@angular/core';
import { DetailComponent } from '../../shared/detail/detail.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { CategoryService } from '../../services/category.service';
import { NgStyle } from '@angular/common';



@Component({
  selector: 'app-categories',
  imports: [DetailComponent, AddCategoryComponent, NgStyle],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  private categoryService = inject(CategoryService)

  public showDetail: boolean = false;

  // signals
  public categoriesSignal = this.categoryService.categoriesSignal.asReadonly();
  public totalCategoriesSignal = this.categoryService.totalCategoriesSignal.asReadonly();

  ngOnInit(){
    this.categoryService.getCategories();
  }
  


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
    this.categoryService.getCategories();
  }

}
