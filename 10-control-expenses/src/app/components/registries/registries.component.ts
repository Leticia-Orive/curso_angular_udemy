import { Component } from '@angular/core';
import { DetailComponent } from '../../shared/detail/detail.component';
import { AddRegistryComponent } from './components/add-registry/add-registry.component';
import { TTypeRegistry } from '../../types';
import { IRegistry } from '../../models/registry.model';

@Component({
  selector: 'app-registries',
  imports: [DetailComponent, AddRegistryComponent],
  templateUrl: './registries.component.html',
  styleUrl: './registries.component.scss'
})
export class RegistriesComponent {
  public registrySelected!: IRegistry;
  public showDetail = false;
  public typeRegistry: TTypeRegistry = 'deposit';

  /**
   * Abrimos el detalle para crear el registro
   * @param type 
   */
  openDetail(type: TTypeRegistry) {
    this.typeRegistry = type;
    this.showDetail = true;
  }

   /**
   * Cerramos el detalle, si la acción es correcta, pedimos los datos de nuevo
   * @param actionSuccess 
   */
   closeDetail(actionSuccess: boolean = false){
    this.showDetail = false;
    
  }

}
