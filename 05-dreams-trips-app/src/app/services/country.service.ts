import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private URL_BASE = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  /**
   * Obtenemos todas las subregiones que tenemos en el fichero json
   * @returns 
   */
  getAllSubregions(){
    return this.http.get<string[]>(`/data/subregions.json`).pipe(first());
  };
}
