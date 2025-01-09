import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first, map } from 'rxjs';
import { IHaircare } from '../models/haircare.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HaircaresService {
  private URL_BASE = `${environment.urlServer}/haircares`;

  private http = inject(HttpClient);

  getHaircares() {
    return this.http.get<IHaircare[]>(this.URL_BASE).pipe(first())
  }

  getColor(haircare: string){
    return this.http.get<IHaircare[]>(`${this.URL_BASE}?value=${haircare}`).pipe(
      first(),
      map ((haircares: IHaircare[]) => haircares[0]?.color)
    )
  }
}
