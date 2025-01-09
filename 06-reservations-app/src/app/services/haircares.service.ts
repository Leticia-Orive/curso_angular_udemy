import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HaircaresService {
  private URL_BASE = '${environment.urlServer}/haircares';
}
