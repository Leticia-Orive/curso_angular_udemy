import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ICreatePaymentIntent } from '../models/create-payment-intent.model';
import { first } from 'rxjs';
import { IPayment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private URL_BASE = `${environment.urlServer}/v1/stripe`;
    private http = inject(HttpClient);

    createPaymentSheet(paymentIntent: ICreatePaymentIntent){
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${paymentIntent.secretKey}`

      })
      return this.http.post<IPayment>(`${this.URL_BASE}/intent`, paymentIntent, {headers}).pipe(first());

    };
  
}
