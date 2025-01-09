import { DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HaircaresService } from '../../services/haircares.service';
import { HoursService } from '../../services/hours.service';
import { IHaircare } from '../../models/haircare.model';
import { IHour } from '../../models/hour.model';

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
    console.log(this.formGroup.value);
  }

  }