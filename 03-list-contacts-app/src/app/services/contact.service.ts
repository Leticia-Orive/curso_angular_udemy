import { Injectable } from '@angular/core';
import { IContact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  //Añadimos una propiedad
  public listContacts: IContact[] = [];

  constructor() { }
}
