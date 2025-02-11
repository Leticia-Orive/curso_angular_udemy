import { Component, inject, signal, WritableSignal } from '@angular/core';
import { DetailComponent } from '../../shared/detail/detail.component';
import { AddRegistryComponent } from './components/add-registry/add-registry.component';
import { TTypeRegistry } from '../../types';
import { IRegistry } from '../../models/registry.model';
import { RegistryService } from '../../services/registry.service';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { GetCategoryPipe } from '../../pipes/get-category.pipe';
import { FilterComponent } from '../../shared/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { IFilter } from '../../shared/filter/models/filter.model';
import moment from 'moment';

@Component({
  selector: 'app-registries',
  standalone: true,
  imports: [DetailComponent, AddRegistryComponent, DatePipe, NgClass, GetCategoryPipe,
     AsyncPipe, FilterComponent, FormsModule],
  templateUrl: './registries.component.html',
  styleUrl: './registries.component.scss'
})
export class RegistriesComponent {

  private registryService = inject(RegistryService)

  public registrySelected!: IRegistry;
  public showDetail = false;
  public typeRegistry: TTypeRegistry = 'deposit';
  public filterSignal: WritableSignal<IFilter> = signal({
    category: '',
    dateStart: moment().startOf('month').format('YYYY-MM-DD'),
    dateEnd: moment().endOf('month').format('YYYY-MM-DD')
  })
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
  onFilter(filter: IFilter){
    this.filterSignal.set(filter);
    console.log(this.filterSignal());

  }

  ngOnDestroy(){
    this.registryService.reset();
  }

}
