import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-booking',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.scss',
  providers: [
    DatePipe
  ]
})
export class AddBookingComponent {

  public formBuilder: FormBuilder = inject(FormBuilder);
  
  public datePipe: DatePipe = inject(DatePipe);

  public formGroup: FormGroup = new FormGroup({});

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      date: new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required),
      time: new FormControl('', Validators.required),
      haircare: new FormControl('', Validators.required)
    })
  }
  addBooking(){
    console.log(this.formGroup.value);
  }

  }