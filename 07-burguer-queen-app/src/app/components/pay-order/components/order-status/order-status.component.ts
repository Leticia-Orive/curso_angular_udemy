import { Component, inject } from '@angular/core';
import { UserOrderService } from '../../../../services/user-order.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef, MatHeaderRow, MatRow, MatRowDef, MatCellDef } from '@angular/material/table';
import { CalculateTotalPricePipe } from '../../../../pipes/calculate-total-price.pipe';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { IProduct } from '../../../../models/product.model';
import { Router } from '@angular/router';

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
    CalculateTotalPricePipe,
    MatMiniFabButton,
    MatIcon
  ],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
//este se pone en import pero como lo he comentado en html lo quito JsonPipe import { JsonPipe } from '@angular/common';
export class OrderStatusComponent {

  private UserOrderService= inject(UserOrderService) ;
  //injecto el router para poder navegar a la pagina de categorias
  private router = inject(Router);

  public productsSignal = this.UserOrderService.productsSignals;
  public totalOrderSignal = this.UserOrderService.totalProductsSignals;
  public displayedColumns: string[] = ['name', 'price', 'quantity', 'total'];

  oneLessProduct(product: IProduct) {
    this.UserOrderService.oneLessProduct(product);

    //por si el producto se queda a cero y desaparece que nos derive a la pagina de categorias
    if(this.productsSignal().length == 0){
      this.router.navigateByUrl('/categories')
    }
  }
  oneMoreProduct(product: IProduct) {
    this.UserOrderService.oneMoreProduct(product);
  }

}
