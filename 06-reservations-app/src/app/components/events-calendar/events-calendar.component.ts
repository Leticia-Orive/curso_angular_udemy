import { Component, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-events-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './events-calendar.component.html',
  styleUrl: './events-calendar.component.scss'
})
export class EventsCalendarComponent {

  private translateService = inject(TranslateService)

  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    firstDay: 1,
    locale: this.translateService.currentLang,
    headerToolbar: {
      left: 'title',
      right: 'prev,next'
    }
  };

  ngOnInit() {

    this.translateService.onLangChange.asObservable().subscribe({
      next: (event: LangChangeEvent) => {
        this.calendarOptions.locale = event.lang;
        console.log(event.lang);
      }
    })


  }

}
