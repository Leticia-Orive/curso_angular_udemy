import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IBooking } from '../models/booking.model';
import { IEvent } from '../models/event.model';
import { first, switchMap } from 'rxjs';
import { HaircaresService } from './haircares.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

 private URL_BASE = `${environment.urlServer}/events`;
   
     private http = inject(HttpClient);
     private haircareService = inject(HaircaresService)

     

     createEvent(booking: IBooking){
      return this.haircareService.getColor(booking.haircare).pipe(
        switchMap( (color: string) => {
         const event: IEvent = {
        start: new Date(`${booking.date}T${booking.time}`),
        title: booking.name,
        description: booking.haircare,
        backgroundColor: color,
        borderColor: color
      };
      //Para crear un evento
      return this.http.post<IEvent>(this.URL_BASE, event).pipe(first()); 
        })
      )
      
     }
}
