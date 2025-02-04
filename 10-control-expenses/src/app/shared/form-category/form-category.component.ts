import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategory } from '../../models/category.model';



@Component({
  selector: 'app-form-category',
  imports: [ReactiveFormsModule],
  templateUrl: './form-category.component.html',
  styleUrl: './form-category.component.scss'
})
export class FormCategoryComponent {

  private formBuilder = inject(FormBuilder);
  

  @Input() category?: ICategory;
  @Output() submitForm: EventEmitter<ICategory> = new EventEmitter<ICategory>();

  public formCategory: FormGroup = new FormGroup({})

  ngOnInit(){
    this.formCategory = this.formBuilder.group({
      name: new FormControl(this.category?.name ?? '', Validators.required, ),
      color: new FormControl(this.category?.color ?? '#000', Validators.required),
      id: new FormControl(this.category?.id ?? ''),
      user: new FormControl(this.category?.user ?? ''),
      createdOn: new FormControl(this.category?.createdOn ?? '')
    })
  }

   /**
   * Hace submit al formulario
   */
   submit(){
    const category: ICategory = this.formCategory.value;
    this.submitForm.emit(category);
  }


}
