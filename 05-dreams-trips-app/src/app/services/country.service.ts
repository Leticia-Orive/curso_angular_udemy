import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { ICountry } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private URL_BASE = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  /**
   * Obtiene los countries dada una subregion
   * @param subregion 
   * @returns 
   */
  getCountriesBySubregion(subregion: string){
    return this.http.get<any[]>(`${this.URL_BASE}/subregion/${subregion}`).pipe(
      first(),
      map( (countries: any[]) => countries.map( country => {
        // Parseamos el objeto a ICountry
        return {
          name: country.name.common,
          flag: country.flags.png,
          latlng: country.latlng
        } as ICountry
      }))
    )
  }

  /**
   * Obtenemos todas las subregiones que tenemos en el fichero json
   * @returns 
   */
  getAllSubregions(){
    return this.http.get<string[]>(`/data/subregions.json`).pipe(first());
  };
}
