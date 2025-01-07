import { Component, inject } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { count, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICountry } from '../../models/country.model';

@Component({
  selector: 'app-list-countries',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './list-countries.component.html',
  styleUrl: './list-countries.component.scss'
})
export class ListCountriesComponent {
  private countryService = inject(CountryService);

  public listCountries: ICountry[] = [];
  public listCountriesToVisit: ICountry[] = [];

  public subregions$: Observable<string[]> = this.countryService.getAllSubregions();
  public subregionSelected ='Southern Europe';

  ngOnInit(){
    this.filterCountries();
  }

  filterCountries(){
    console.log(this.subregionSelected);
    this.countryService.getCountriesBySubregion(this.subregionSelected).subscribe({
      next: (countries: ICountry[]) => {
        this.listCountries = countries.filter(country => !this.listCountriesToVisit.some(countryVisit =>
          country.name == countryVisit.name))
          console.log(this.listCountries);
      }
    });
  }

}
