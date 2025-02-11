import { Component, inject } from '@angular/core';
import { DetailComponent } from '../../shared/detail/detail.component';
import { AddRegistryComponent } from './components/add-registry/add-registry.component';
import { TTypeRegistry } from '../../types';
import { IRegistry } from '../../models/registry.model';
import { RegistryService } from '../../services/registry.service';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { GetCategoryPipe } from '../../pipes/get-category.pipe';

@Component({
  selector: 'app-registries',
  standalone: true,
  imports: [DetailComponent, AddRegistryComponent, DatePipe, NgClass, GetCategoryPipe, AsyncPipe],
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
  public nextRegistriesSignal = this.registryService.nextRegistriesSignal.asReadonly();
  public previousRegistriesSignal= this.registryService.previousRegistriesSignal.asReadonly();
  
  ngOnInit(){
    this.next();
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
  closeDetail(actionSuccess: boolean = false ){
    this.showDetail = false;
    if(actionSuccess){
      this.registryService.resetPagination();
      this.next();
    }

  }
  /**
   * Obtenemos los registros anteriores
   */
  previous(){
    this.registryService.getRegistries( 'previous')
  }

  /**
   * Obtenemos los registros posteriores
   */
  next(){
    this.registryService.getRegistries( 'next')
  }

  ngOnDestroy(){
    this.registryService.reset();
  }

}
