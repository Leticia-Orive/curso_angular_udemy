import { Component, inject } from '@angular/core';
import { UserOrderService } from '../../../../services/user-order.service';
import { TranslateModule } from '@ngx-translate/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-order-status',
  imports: [TranslateModule, JsonPipe],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
export class OrderStatusComponent {

  private UserOrderService= inject(UserOrderService) ;

  public productsSignal = this.UserOrderService.productsSignals;
  public totalOrderSignal = this.UserOrderService.totalProductsSignals;

}
