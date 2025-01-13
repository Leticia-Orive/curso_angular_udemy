import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, DatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  //para que se cambie automaticamente el año
  public today: Date = new Date();

}
