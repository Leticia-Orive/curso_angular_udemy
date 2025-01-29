import { Component, ElementRef, ViewChild } from '@angular/core';
import { Modal} from 'bootstrap'

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @ViewChild("modal", { static: true }) modal!: ElementRef;

  private modalInstance!: Modal;

  ngAfterViewInit() {
    this.modalInstance = new Modal(this.modal.nativeElement);
  }

}
