import { Component, inject } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-countries',
  imports: [],
  templateUrl: './list-countries.component.html',
  styleUrl: './list-countries.component.scss'
})
export class ListCountriesComponent {
  private countryService = inject(CountryService);

  public subregions$: Observable<string[]> = this.countryService.getAllSubregions();

}
