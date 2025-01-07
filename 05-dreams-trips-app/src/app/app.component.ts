import { Component } from '@angular/core';

import { ListCountriesComponent } from './components/list-countries/list-countries.component';

@Component({
  selector: 'app-root',
  imports: [ListCountriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '05-dreams-trips-app';
}
