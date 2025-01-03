import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFilter } from '../models/filter.model';
import { first, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private URL_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';
private http = inject(HttpClient);

//Creamos un metodo para obtener los cocktails
getCocktails(filter: IFilter) {
  //Creamos una variale
  let additionalUrl = '';
  if(filter.searchBy === 'name') {
    additionalUrl = `search.php?s=}`;
  }else{
    additionalUrl = 'filter.php?';
    if(filter.searchBy === 'glass') {
      additionalUrl += 'g=';
  }else if(filter.searchBy === 'category') {
    additionalUrl += 'c=';
  }else{
    additionalUrl += 'i='
  }
}
  additionalUrl += filter.value;
  return this.http.get(this.URL_BASE + additionalUrl).pipe(
    //tambien se puede ver como take(1) y significa dame el primer valor y ya
    //cuando no lo cerraremos cuando estemos pendiente de algo ejemplo cambio de idioma, eventos etc
    first(),
    map((data:any) => data)
  );
}
}
//+= lo que hace es añadir el valor de la variable a la variable
//= lo que hace es machacar el valor de la variable a lo de antes