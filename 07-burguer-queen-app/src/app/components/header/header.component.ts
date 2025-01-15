import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { UserOrderService } from '../../services/user-order.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatIconModule,MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private translateService= inject(TranslateService);
  private userOrderService= inject(UserOrderService);

  public languages: string[] = ['es', 'en'];
  public numProductsSignal: Signal<number> = this.userOrderService.numProductsSignals;

  changeLang(language:string){
    this.translateService.use(language);
  }

}
