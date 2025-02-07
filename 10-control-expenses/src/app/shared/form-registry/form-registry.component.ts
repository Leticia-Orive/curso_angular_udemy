import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRegistry } from '../../models/registry.model';
import { TTypeRegistry } from '../../types';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-registry',
  imports: [ReactiveFormsModule],
  templateUrl: './form-registry.component.html',
  styleUrl: './form-registry.component.scss',
  providers: [
    DatePipe
  ]
})
export class FormRegistryComponent {

  private formBuilder = inject(FormBuilder);
  private datePipe = inject(DatePipe);

  @Input() registry?:  IRegistry;
  @Input({required: true}) typeRegistry!: TTypeRegistry;
  @Output() submitForm: EventEmitter<IRegistry> = new EventEmitter<IRegistry>();

   // Formgroup
   public formRegistry: FormGroup = new FormGroup({});

   ngOnInit(){

    this.formRegistry = this.formBuilder.group({
      description: new FormControl(this.registry?.description ?? '', Validators.required),
      date: new FormControl(this.registry ? this.datePipe.transform(this.registry.date, 'yyyy-MM-dd') : ''),
      type: new FormControl(this.typeRegistry),
      idCategory: new FormControl(this.registry?.idCategory ?? ''),
      quantity: new FormControl(this.registry?.quantity ?? '0', Validators.required),
      id: new FormControl(this.registry?.id ?? ''),
      user: new FormControl(this.registry?.user)
    })

  }

  /**
  * Hace submit al formulario
  */
  submit(){
    const registry = this.formRegistry.value as IRegistry;
    this.submitForm.emit(registry);
  }


  

}
