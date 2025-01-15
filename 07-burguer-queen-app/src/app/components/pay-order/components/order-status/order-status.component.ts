import { Component, inject } from '@angular/core';
import { UserOrderService } from '../../../../services/user-order.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef, MatHeaderRow, MatRow, MatRowDef, MatCellDef } from '@angular/material/table';
import { CalculateTotalPricePipe } from '../../../../pipes/calculate-total-price.pipe';


@Component({
  selector: 'app-order-status',
  imports: [
    TranslateModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatCellDef,
    CalculateTotalPricePipe



  ],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
//este se pone en import pero como lo he comentado en html lo quito JsonPipe import { JsonPipe } from '@angular/common';
export class OrderStatusComponent {

  private UserOrderService= inject(UserOrderService) ;

  public productsSignal = this.UserOrderService.productsSignals;
  public totalOrderSignal = this.UserOrderService.totalProductsSignals;
  public displayedColumns: string[] = ['name', 'price', 'quantity', 'total'];

}
