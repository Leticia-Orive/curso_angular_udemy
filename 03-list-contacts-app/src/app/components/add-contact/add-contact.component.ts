import { Component } from '@angular/core';
import { IContact } from '../../models/contact.model';
import { FormsModule } from '@angular/forms';
import {  NgClass } from '@angular/common';

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
  }
// para importa que se recarge la pagina se debe importar el formsModule

//funcion
addContact(){
  console.log(this.contact);
}
}
