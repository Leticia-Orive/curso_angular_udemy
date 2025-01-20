import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ICategory } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private http = inject(HttpClient);

  private URL_BASE = `${environment.urlServer}/v1/categories`;

  getCategoriesPublic(){
    return this.http.get<ICategory[]>(`${this.URL_BASE}/public`);
  }

}
