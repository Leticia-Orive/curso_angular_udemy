import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SIZE_PAGINATION } from '../constants';
import { first } from 'rxjs';
import { IPage } from '../models/page.model';
import { IPost } from '../models/post.model';
import { TSort } from '../shared/components/table-data/types/sort.type';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private http = inject(HttpClient)
  private URL_BASE = `${environment.urlServer}/v1/posts`

  getPosts(page: number, q?: string, sortBy?: string, sort?: TSort){

    // URL Base
    let url = `${this.URL_BASE}?page=${page}&size=${SIZE_PAGINATION}`

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
    return this.http.get<IPage<IPost>>(url).pipe(first());
  }
 
}
