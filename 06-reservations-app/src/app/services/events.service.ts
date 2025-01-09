import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IBooking } from '../models/booking.model';
import { IEvent } from '../models/event.model';
import { first, switchMap,map } from 'rxjs';
import { HaircaresService } from './haircares.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private URL_BASE = `${environment.urlServer}/events`

  private http = inject(HttpClient);
  private haircareService = inject(HaircaresService);

  createEvent(booking: IBooking) {

    const formatDate = new Date(`${booking.date}T${booking.time}`).toISOString();
    return this.existsEvent(formatDate).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          return this.haircareService.getColor(booking.haircare);
        } else {
          throw new Error();
        }
      }),
      switchMap((color: string) => {
        const event: IEvent = {
          start: new Date(formatDate),
          title: booking.name,
          description: booking.haircare,
          backgroundColor: color,
          borderColor: color
        };
        return this.http.post<IEvent>(this.URL_BASE, event).pipe(first())
      })
    )
  }

  private existsEvent(date: string) {
    return this.http.get<IEvent[]>(`${this.URL_BASE}?start=${date}`).pipe(
      first(),
      map((events: IEvent[]) => events.length > 0)
    )
  }
}
