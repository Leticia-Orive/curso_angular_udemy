import { Component, inject, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { injectStripe, StripeElementsDirective, StripePaymentElementComponent } from 'ngx-stripe';
import { environment } from '../../../environments/environment.development';
import {
  StripeElementsOptions,
  StripePaymentElementOptions,
  StripeElementLocale
} from '@stripe/stripe-js';
import { StripeService } from '../../services/stripe.service';
import { ICreatePaymentIntent } from '../../models/create-payment-intent.model';
import { UserOrderService } from '../../services/user-order.service';
import { IPayment } from '../../models/payment.model';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IOrder } from '../../models/order.model';
import { AuthService } from '../../services/auth.service';
import { first, Subject, switchMap, takeUntil } from 'rxjs';
import { IAuthCredentials } from '../../models/auth-credentials';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogTicketComponent } from '../dialogs/dialog-ticket/dialog-ticket.component';

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

  // Obtengo el template del formulario de pago (ngx-stripe-payment)
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent

  // Obtengo el template del formulario (ngx-stripe-elements)
  @ViewChild(StripeElementsDirective)
  formElement!: StripeElementsDirective

  private stripeService = inject(StripeService);
  private userOrderService = inject(UserOrderService);
  private translateService = inject(TranslateService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private orderService = inject(OrdersService);
  private router = inject(Router)

  public stripe = injectStripe(environment.stripe.publishKey);

  // Opciones formulario
  public elementsOptions: StripeElementsOptions = {
    locale: (this.translateService.currentLang || this.translateService.defaultLang) as StripeElementLocale,
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

  // Total de la orden
  public totalOrderSignal = this.userOrderService.totalOrderSignal;
  // Ultimo total, usado para saber si tenemos que pedir un nuevo paymentIntent
  private lastTotal: number = 0;
  // Subject para desuscribirse
  private unsubscribe$ = new Subject<void>();

  ngOnInit(){

    // Controlamos el cambio de idioma para el formulario
    this.translateService.onLangChange.asObservable().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (langEvent: LangChangeEvent) => {
        this.elementsOptions.locale = langEvent.lang as StripeElementLocale;
        if(this.formElement){
          // actualizo el formulario
          this.formElement.update(this.elementsOptions);
        }
      }
    })

  }

  /**
   * Creo el paymentIntent para generar el clientSecret
   * @param event 
   */
  createPaymentIntent(event: StepperSelectionEvent) {

    // Si estoy en el step de pago y si no hay clientSecret o el total ha cambiado, entro
    if (event.selectedIndex == 1 && (!this.elementsOptions.clientSecret || this.lastTotal != this.totalOrderSignal())) {

      this.lastTotal = this.totalOrderSignal();
      // Necesario para stripe
      const amount = this.totalOrderSignal() * 100;

      // Preparo el paymentIntent
      const paymentIntent: ICreatePaymentIntent = {
        secretKey: environment.stripe.secretKey,
        amount: +amount.toFixed(0),
        currency: 'EUR',
        customer_id: environment.stripe.customer_id
      }

      // Creo el paymentIntent
      this.stripeService.createPaymentSheet(paymentIntent).subscribe({
        next: (paymentIntent: IPayment) => {
          // Obtengo el clientSecret
          this.elementsOptions.clientSecret = paymentIntent.paymentIntentClientSecret;
        }
      })
    }

  }

  /**
   * Confirmo el pago y crea la orden
   */
  payOrder() {

    // Confirmo el pago
    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        redirect: 'if_required'
      })
      .subscribe(result => {
        if (result.error) {
          this.snackBar.open(
            this.translateService.instant('label.payment.error'),
            this.translateService.instant('label.error'),
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 5000
            }
          )
        } else {
          // si todo ha ido bien, mostramos un mensaje y creamos la orden
          if (result.paymentIntent.status === 'succeeded') {
            this.snackBar.open(
              this.translateService.instant('label.payment.ok'),
              this.translateService.instant('label.ok'),
              {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 5000
              }
            )
            this.createOrder();
          }
        }
      });

  }

  /**
   * Crea la orden en nuestro backend
   */
  createOrder() {

    // Datos de entrada
    const order: IOrder = {
      address: 'Calle falsa 123',
      user: {
        email: 'test@gmail.com', // IMPORTANTE que se llame igual
        password: '123456'
      },
      products: this.userOrderService.productsSignals()
    }

    // Necesario para poder insertar ordenes
    this.authService.login(order.user).pipe(
      switchMap((data: IAuthCredentials) => 
        // Creo la orden
        this.orderService.createOrder(order, data.accessToken))
    ).subscribe({
      next: (order: IOrder) => {
        console.log(order);
        // reseteo la orden
        this.userOrderService.resetOrder();
        // Abro el dialogo para mostrar el ticket
        // Cuando se cierra volvemos a las categorias
        this.dialog.open(DialogTicketComponent, {
          data: {
            ticket: order.ticket
          }
        }).afterClosed().pipe(first()).subscribe({
          next: () => {
            this.router.navigateByUrl('/categories')
          }
        })
      }
    })

  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
