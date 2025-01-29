import { inject, Injectable, ViewContainerRef } from '@angular/core';
import { IModal } from '../models/modal.model';
import { first, switchMap, finalize } from 'rxjs';
import { ModalComponent } from '../modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private viewContainerRef = inject(ViewContainerRef)

  private createModal(modalData: IModal){

    // creo un ModalComponent
    const modalComponentRef = this.viewContainerRef.createComponent(ModalComponent);

    // Relleno el componente
    modalComponentRef.instance.modalData = {
      title: modalData.title ?? 'Confirmación', // Es lo mismo ?? que poner esto: modalData.title ? modalData.title : 'Confirmación'
      content: modalData.content,
      btnTextAccept: modalData.btnTextAccept ?? 'Aceptar',
      btnTextClose: modalData.btnTextClose ?? 'Cerrar'
    }

    
    return modalComponentRef;

  }


  open(modalData: IModal){
    // creo el modal
    const modal = this.createModal(modalData)
    setTimeout(() => {
modal.instance.open();
    },1000)
    // Quedo pendiente al evento rendered
    
    
  }
}
