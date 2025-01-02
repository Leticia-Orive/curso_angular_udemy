import { Routes } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ListContactsComponent } from './components/list-contacts/list-contacts.component';

export const routes: Routes = [
    //Vamos a añadir las rutas de los componentes
    { path: 'add-contact', component: AddContactComponent },
    {path: 'list-contacts', component: ListContactsComponent},
    //ruta no valida
    {path: '**', redirectTo: 'add-contact'}
];
