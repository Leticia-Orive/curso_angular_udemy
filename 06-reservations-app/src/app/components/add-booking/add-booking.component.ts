import { DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HaircaresService } from '../../services/haircares.service';
import { HoursService } from '../../services/hours.service';
import { IHaircare } from '../../models/haircare.model';
import { IHour } from '../../models/hour.model';
import { EventsService } from '../../services/events.service';
import { IBooking } from '../../models/booking.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-booking',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, NgClass],
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.scss',
  providers: [
    DatePipe
  ]
})
export class AddBookingComponent {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private datePipe: DatePipe = inject(DatePipe);
 /**Esto es una forma de ponerlo
  * private haircaresService: HaircaresService = new HaircaresService();
  */
 /**Y esto otra */
  private haircaresService = inject(HaircaresService);
  private hourService = inject(HoursService);
  /**Añadimos nuestro evento */
  private eventService = inject(EventsService);

  private toastrService = inject(ToastrService);
  private translateService = inject(TranslateService);

  public formGroup: FormGroup = new FormGroup({});
  public haircares: IHaircare[] = [];
  public hours: IHour[] = [];

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      date: new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required),
      time: new FormControl('', Validators.required),
      haircare: new FormControl('', Validators.required)
    })

    /** Lo vamos a obtener */
    this.haircaresService.getHaircares().subscribe({
      next: (haircares: IHaircare[]) => {
        this.haircares = haircares;
        this.controlHaircare?.setValue(this.haircares[0].value);//quiere decir que el primer valor del array es el que se va a seleccionar
       
      }
    })

    this.hourService.getHours().subscribe({
      next: (hour: IHour[]) => {
        this.hours = hour;
        this.controlTime?.setValue(this.hours[0].value);
      }
    })
  }
//esto no es necesario pero te ayuda a que no se te olvide nada
  get controlName(){
    return this.formGroup.get('name');
  }

  get controlDate(){
    return this.formGroup.get('date');
  }

  get controlHaircare(){
    return this.formGroup.get('haircare');
  }

  get controlTime(){
    return this.formGroup.get('time');
  }

  addBooking(){
    
    const booking: IBooking = this.formGroup.value;
    console.log(booking);

    this.eventService.createEvent(booking).subscribe({
      next: (event) => {
        console.log('Evento creado');
        //muestra un mensaje de que se ha creado el evento
        this.toastrService.success(
          this.translateService.instant('add.booking.success'),
          this.translateService.instant('success')
        );
      }, 
      error: (error) => {
        console.error('habido un error');
        this.toastrService.error(
          this.translateService.instant('booking.exists'),
          this.translateService.instant('error')
        );
      }
    })
  }

  }