import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  public showDetail: boolean = true;

  closeDetail(){
    this.showDetail = false;
    this.close.emit();
  }

}
