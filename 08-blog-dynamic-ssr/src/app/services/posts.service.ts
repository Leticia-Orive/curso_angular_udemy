import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IPage } from '../models/page.model';
import { IPost } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private http = inject(HttpClient);

  private URL_BASE = `${environment.urlServer}/v1/posts`;

  getPosts(page: number = 1, q?: string, category?: string): Observable<IPage<IPost>>{

    // url base
    let url = `${this.URL_BASE}/published?page=${page}&size=4&sortby=publishedDate&sort=DESC`

    
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

  
}
