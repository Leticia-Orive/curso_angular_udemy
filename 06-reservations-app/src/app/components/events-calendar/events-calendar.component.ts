import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
@Component({
  selector: 'app-events-calendar',
  imports: [FullCalendarModule],
  templateUrl: './events-calendar.component.html',
  styleUrl: './events-calendar.component.scss'
})
export class EventsCalendarComponent {

  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
   plugins: [dayGridPlugin]

};
}
