import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IPage } from '../models/page.model';
import { IPost } from '../models/post.model';
import { Observable } from 'rxjs';
import { SIZE_PAGINATION, SORT_BY_PAGINATION, SORT_PAGINATION } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private http = inject(HttpClient);

  private URL_BASE = `${environment.urlServer}/v1/posts`;

  getPosts(page: number = 1, q?: string, category?: string): Observable<IPage<IPost>>{

    let url = `${this.URL_BASE}/published?page=${page}&size=${SIZE_PAGINATION}&sortby=${SORT_BY_PAGINATION}&sort=${SORT_PAGINATION}`

    if(q){
      url += `&q=${q}`;
    }

    if(category){
      url += `&category=${category}`;
    }

    return this.http.get<IPage<IPost>>(url);

  }

}
