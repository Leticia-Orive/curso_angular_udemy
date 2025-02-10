import { Component, inject } from '@angular/core';
import { DetailComponent } from '../../shared/detail/detail.component';
import { AddRegistryComponent } from './components/add-registry/add-registry.component';
import { TTypeRegistry } from '../../types';
import { IRegistry } from '../../models/registry.model';
import { RegistryService } from '../../services/registry.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-registries',
  standalone: true,
  imports: [DetailComponent, AddRegistryComponent, DatePipe, NgClass],
  templateUrl: './registries.component.html',
  styleUrl: './registries.component.scss'
})
export class RegistriesComponent {

  private registryService = inject(RegistryService)

  public registrySelected!: IRegistry;
  public showDetail = false;
  public typeRegistry: TTypeRegistry = 'deposit';
// signals
  public registriesSignal = this.registryService.registriesSignal.asReadonly();
  
  ngOnInit(){
    this.registryService.getRegistries();
  }
   /**
   * Abrimos el detalle para crear el registro
   * @param type 
   */
  
  openDetail(type: TTypeRegistry){
    this.typeRegistry = type;
    this.showDetail = true;
  }
/**
   * Cerramos el detalle, si la acción es correcta, pedimos los datos de nuevo
   * @param actionSuccess 
   */
  closeDetail(){
    this.showDetail = false;
  }
  trackById(index: number, item: IRegistry) {
    return item.id;
  }

}
