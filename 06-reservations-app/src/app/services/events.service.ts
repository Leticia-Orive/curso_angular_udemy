import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IBooking } from '../models/booking.model';
import { IEvent } from '../models/event.model';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

 private URL_BASE = `${environment.urlServer}/events`;
   
     private http = inject(HttpClient);

     createEvent(booking: IBooking){
      const event: IEvent = {
        start: new Date(`${booking.date}T${booking.time}`),
        title: booking.name,
        description: booking.haircare,
        backgroundColor: '#ff0000',
        borderColor: '#ff0000'
      };
      //Para crear un evento
      return this.http.post<IEvent>(this.URL_BASE, event).pipe(first());
     }
}
