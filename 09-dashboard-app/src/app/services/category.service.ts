import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { first } from 'rxjs';
import { ICategory } from '../models/category.model';
import { IPage } from '../models/page.model';
import { SIZE_PAGINATION } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient)
  private URL_BASE = `${environment.urlServer}/v1/categories`

  getCategories(page: number, q?: string, sortBy?: string, sort?: string){

    // URL base
    let url = `${this.URL_BASE}?page=${page}&size=${SIZE_PAGINATION}`;

    // Completamos la URL
    if(q){
      url += `&q=${q}`;
    }
    
    if(sortBy){
      url += `&sortBy=${sortBy}`;
    }

    if(sort){
      url += `&sort=${sort}`;
    }

    return this.http.get<IPage<ICategory>>(url).pipe(first())

  }
  //Obtener todas las categorias
  getAllCategories(){
    return this.http.get<ICategory[]>(`${this.URL_BASE}/all`).pipe(first())
  }
//Obtener una categoria por id
  getCategoryById(id: string){
    return this.http.get<ICategory>(`${this.URL_BASE}/${id}`).pipe(first())
  }
//crear una categoria
  createCategory(category: ICategory){
    return this.http.post<ICategory>(`${this.URL_BASE}`, category).pipe(first())
  }
  
}
