import { Component, inject } from '@angular/core';
import { IContact } from '../../models/contact.model';
import { FormsModule } from '@angular/forms';
import {  NgClass } from '@angular/common';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-add-contact',
  imports: [FormsModule, NgClass, ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {

  public contact: IContact = {
    name:"",
    surname:"",
    telephone:""
  };
  //pero nosotros lo vamos a hacer de otra forma usando Injectable 
  private contactService: ContactService = inject(ContactService);
  //esta es la forma clasica de hacerlo
  //constructor(private contactService: ContactService){}
// para importa que se recarge la pagina se debe importar el formsModule

//funcion
addContact(){
  console.log(this.contact);
  //Sirve para hacer una copia de un objeto vacio {} y le añade los valores de this.contact
  const contact = Object.assign({}, this.contact);
  this.contactService.addContact(contact);
  console.log(this.contactService.listContacts);
}
}
