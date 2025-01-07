import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private URL_BASE = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);
}
