import { Component, inject } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { count, finalize, Observable } from 'rxjs';
import { AsyncPipe,  NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICountry } from '../../models/country.model';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list-countries',
  imports: [AsyncPipe, FormsModule,CdkDropList,CdkDrag, NgTemplateOutlet],
  templateUrl: './list-countries.component.html',
  styleUrl: './list-countries.component.scss'
})
export class ListCountriesComponent {
  private countryService = inject(CountryService);

  public listCountries: ICountry[] = [];
  public listCountriesToVisit: ICountry[] = [];

  public subregions$: Observable<string[]> = this.countryService.getAllSubregions();
  public subregionSelected ='Southern Europe';
  public loadCountries: boolean = false;

  ngOnInit(){
    this.filterCountries();
  }

  filterCountries(){
    this.loadCountries = false;
    console.log(this.subregionSelected);
    this.countryService.getCountriesBySubregion(this.subregionSelected).pipe(
      finalize(() => this.loadCountries = true)
    ).subscribe({
      next: (countries: ICountry[]) => {
        this.listCountries = countries.filter(country => !this.listCountriesToVisit.some(countryVisit =>
          country.name == countryVisit.name))
          console.log(this.listCountries);
      }
    });
  }
  drop(event: CdkDragDrop<ICountry[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
