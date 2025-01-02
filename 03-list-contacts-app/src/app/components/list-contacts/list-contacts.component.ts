import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-list-contacts',
  imports: [],
  templateUrl: './list-contacts.component.html',
  styleUrl: './list-contacts.component.scss'
})
export class ListContactsComponent {

  private contactService: ContactService = inject(ContactService);

}
