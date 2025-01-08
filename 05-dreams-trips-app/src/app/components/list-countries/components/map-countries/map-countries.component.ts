import { Component } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map-countries',
  imports: [GoogleMap],
  templateUrl: './map-countries.component.html',
  styleUrl: './map-countries.component.scss'
})
export class MapCountriesComponent {
  public center: google.maps.LatLngLiteral = {lat: 0, lng: 0};


}
