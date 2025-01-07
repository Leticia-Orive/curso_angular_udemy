import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFilter } from '../models/filter.model';
import { first, map } from 'rxjs';
import { ICocktail } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private URL_BASE = "https://www.thecocktaildb.com/api/json/v1/1";
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
    map((data:any) =>{
      const listCocktails = this.parseDrinks(data)
      return listCocktails[0];
    }) 
  );
}
getCocktailById(id: string){
  const additionalUrl = `lookup.php?i=${id}`;
  return this.http.get(this.URL_BASE + `lookup.php?i=${id}`).pipe(
    first(),
    map((data:any) => this.parseDrinks(data)[0])
  )
}
private parseDrinks(data:any): ICocktail[]{
  //si data es null o no tiene drinks
  //if(!data || !data['drinks']){
 if(!data){
    return [];
  }
  const drinks = data['drinks'] as any[];
  if(!drinks){
    return [];

  }
  return drinks.map(drink => {
    return {
      id: drink['idDrink'],
      name: drink['strDrink'],
      glass: drink['strGlass'],
      img: drink['strDrinkThumb'],
      intructions: drink['strInstructionsES'] || drink['strInstructions'],
      ingredients: this.parseArray(drink, 'strIngredient'),
      measures: this.parseArray(drink, 'strMeasure')
    } as ICocktail
  })
}
private parseArray(drink: any, property: string): string[] {

  //console.log(Object.keys(drink));
  //console.log(Object.keys(drink).filter(key => key.startsWith(property) && drink[key]));
  //console.log(Object.keys(drink).filter(key => key.startsWith(property) && drink[key]).map(key => drink[key] as string));

//dado un objeto drink y una propiedad, devuelve un array con los valores de las propiedades 
// que empiezan por la propiedad
  return Object.keys(drink)
    .filter(key => key.startsWith(property) && drink[key])
    .map(key => drink[key] as string)
}
}
//+= lo que hace es añadir el valor de la variable a la variable
//= lo que hace es machacar el valor de la variable a lo de antes