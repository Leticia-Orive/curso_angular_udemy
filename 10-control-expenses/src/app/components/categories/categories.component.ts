import { Component, inject } from '@angular/core';
import { DetailComponent } from '../../shared/detail/detail.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { CategoryService } from '../../services/category.service';
import { NgStyle } from '@angular/common';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { ICategory } from '../../models/category.model';



@Component({
  selector: 'app-categories',
  imports: [DetailComponent, AddCategoryComponent, NgStyle, UpdateCategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  private categoryService = inject(CategoryService)

  public showDetail: boolean = false;
  public categorySelected?: ICategory;

  // signals
  public categoriesSignal = this.categoryService.categoriesSignal.asReadonly();
  public totalCategoriesSignal = this.categoryService.totalCategoriesSignal.asReadonly();
  public nextCategoriesSignal = this.categoryService.nextCategoriesSignal.asReadonly();
  public previousCategoriesSignal = this.categoryService.previousCategoriesSignal.asReadonly();

  ngOnInit(){
   this.next()
  }
  


/**
   * Abre el detalle para añadir la categoria
   */
  openDetail(){
    this.showDetail = true;
  }

  /**
   * Abre el detalle para actualizar la categoria
   * @param category 
   */
  openUpdateDetail(category: ICategory){
    this.categorySelected = category;
    this.openDetail();
    
  }



  /**
   * Cierra el detalle, si la acción se completó, pedimos los datos de nuevo
   * @param actionSuccess 
   */
  closeDetail(actionSuccess: boolean = false){
    this.showDetail = false;
    if(actionSuccess){
      this.categoryService.reset()
      this.next();
    }
    this.categorySelected = undefined;
    
  }
 
   /**
   * Obtenemos las categorias anteriores
   */
   previous(){
    this.categoryService.getCategories('previous');
  }

  /**
    * Obtenemos las categorias posteriores
   */
  next(){
    this.categoryService.getCategories('next');
  }

 /**
   * Al salir, reseteamos los valores
   */
 ngOnDestroy(){
  this.categoryService.reset();
}
}
