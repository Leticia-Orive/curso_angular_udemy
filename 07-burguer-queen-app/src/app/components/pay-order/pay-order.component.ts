import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';

import { TranslateModule } from '@ngx-translate/core';
import { OrderStatusComponent } from "./components/order-status/order-status.component";
@Component({
  selector: 'app-pay-order',
  imports: [
    TranslateModule,
    MatStepper,
    MatStep,
    MatStepLabel,
    MatStepperNext,
    MatStepperPrevious,
    MatButton,
    OrderStatusComponent
],
  templateUrl: './pay-order.component.html',
  styleUrl: './pay-order.component.scss'
})
export class PayOrderComponent {

}
