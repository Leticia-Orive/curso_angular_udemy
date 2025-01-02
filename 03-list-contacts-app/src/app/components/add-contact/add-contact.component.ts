import { Component } from '@angular/core';
import { IContact } from '../../models/contact.model';

@Component({
  selector: 'app-add-contact',
  imports: [],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {

  public contact: IContact = {
    name:"",
    surname:"",
    telephone:""
  }

}
