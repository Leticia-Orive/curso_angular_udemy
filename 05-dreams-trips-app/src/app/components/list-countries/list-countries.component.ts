import { Component, inject } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { finalize, Observable } from 'rxjs';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICountry } from '../../models/country.model';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MapCountriesComponent } from './components/map-countries/map-countries.component';


@Component({
  selector: 'app-list-countries',
  standalone: true,
  imports: [AsyncPipe, FormsModule, CdkDropList, CdkDrag, NgTemplateOutlet, MapCountriesComponent],
  templateUrl: './list-countries.component.html',
  styleUrl: './list-countries.component.scss'
})
export class ListCountriesComponent {

  private countryService = inject(CountryService);

  public listCountries: ICountry[] = [];
  public listCountriesToVisit: ICountry[] = [];
  public subregions$: Observable<string[]> = this.countryService.getAllSubregions()
  public subregionSelected = 'Southern Europe';
  public loadCountries: boolean = false;
  public markers: google.maps.LatLngLiteral[] = [];

  ngOnInit() {
    this.filterCountries();
  }

  filterCountries() {
    this.loadCountries = false;
    console.log(this.subregionSelected);
    this.countryService.getCountriesBySubregion(this.subregionSelected).pipe(
      finalize(() => this.loadCountries = true)
    ).subscribe({
      next: (countries: ICountry[]) => {
        this.listCountries = countries.filter(country => !this.listCountriesToVisit.some(countryVisit => country.name == countryVisit.name))
        console.log(this.listCountries);
      }
    })
  }

  drop(event: CdkDragDrop<ICountry[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      if (event.previousContainer.id == 'lCountries' && event.container.id == 'lCountriesToVisit') {
        this.markers.push({
          lat: this.listCountriesToVisit[event.currentIndex].latlng[0],
          lng: this.listCountriesToVisit[event.currentIndex].latlng[1]
        })
      } else if (event.previousContainer.id == 'lCountriesToVisit' && event.container.id == 'lCountries') {
        const indexMarker = this.markers.findIndex(marker =>
          marker.lat == this.listCountries[event.currentIndex].latlng[0] &&
          marker.lng == this.listCountries[event.currentIndex].latlng[1]
        );
        this.markers.splice(indexMarker, 1);
      }

      console.log(this.markers);

    }
  }

}
