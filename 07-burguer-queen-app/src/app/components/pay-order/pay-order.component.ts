import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { TranslateModule } from '@ngx-translate/core';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { injectStripe, StripeElementsDirective, StripePaymentElementComponent } from 'ngx-stripe';
import { environment } from '../../../environments/environment.development';
import {
  StripeElementsOptions, 
  StripePaymentElementOptions
} from '@stripe/stripe-js';

@Component({
  selector: 'app-pay-order',
  standalone: true,
  imports: [
    TranslateModule,
    MatStepper,
    MatStep,
    MatStepLabel,
    MatStepperNext,
    MatStepperPrevious,
    MatButton,
    OrderStatusComponent,
    StripeElementsDirective,
    StripePaymentElementComponent
  ],
  templateUrl: './pay-order.component.html',
  styleUrl: './pay-order.component.scss'
})
export class PayOrderComponent {

  public stripe = injectStripe(environment.stripe.publishKey);
  public elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'flat'
    }
  };
  public paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };

  payOrder(){
    
  }


}

