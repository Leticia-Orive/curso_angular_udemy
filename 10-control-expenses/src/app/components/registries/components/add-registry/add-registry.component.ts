import { Component, Input } from '@angular/core';
import { FormRegistryComponent } from '../../../../shared/form-registry/form-registry.component';
import { TTypeRegistry } from '../../../../types';
import { IRegistry } from '../../../../models/registry.model';

@Component({
  selector: 'app-add-registry',
  imports: [FormRegistryComponent],
  templateUrl: './add-registry.component.html',
  styleUrl: './add-registry.component.scss'
})
export class AddRegistryComponent {
  @Input({ required: true }) typeRegistry!: TTypeRegistry;

  createRegistry(registry: IRegistry){
    
  }

}
