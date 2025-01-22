import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IPage } from '../models/page.model';
import { IPost } from '../models/post.model';
import { SIZE_PAGINATION, SORT_BY_PAGINATION, SORT_PAGINATION } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private http = inject(HttpClient);

  private URL_BASE = `${environment.urlServer}/v1/posts`;

  getPosts(page: number = 1, q?: string, category?: string): Observable<IPage<IPost>>{

    // url base
    let url = `${this.URL_BASE}/published?page=${page}&size=${SIZE_PAGINATION}&sortby=${SORT_BY_PAGINATION}&sort=${SORT_PAGINATION}`

    
    // Busqueda de texto
    if(q){
      url += `&q=${q}`;
    }

    // Categoria
    if(category){
      url += `&category=${category}`;
    }

    return this.http.get<IPage<IPost>>(url);

  }
  getPostById(id: string){
    return this.http.get<IPost>(`${this.URL_BASE}/${id}`)
  }

  
}
