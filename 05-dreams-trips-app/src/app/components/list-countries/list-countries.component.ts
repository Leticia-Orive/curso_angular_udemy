import { Component, inject } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-countries',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './list-countries.component.html',
  styleUrl: './list-countries.component.scss'
})
export class ListCountriesComponent {
  private countryService = inject(CountryService);

  public subregions$: Observable<string[]> = this.countryService.getAllSubregions();
  public regionSelected ='Southeast Europe';

  filterCountries(){
    console.log(this.regionSelected);
  }

}
