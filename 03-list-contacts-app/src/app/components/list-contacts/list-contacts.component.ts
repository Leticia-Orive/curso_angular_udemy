import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { IContact } from '../../models/contact.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-list-contacts',
  imports: [TitleCasePipe],
  templateUrl: './list-contacts.component.html',
  styleUrl: './list-contacts.component.scss'
})
export class ListContactsComponent {

  private contactService: ContactService = inject(ContactService);

  public listContacts: IContact[] = this.contactService.listContacts;

  deleteContact(index:number){
    this.contactService.deleteContact(index);
  }

}
