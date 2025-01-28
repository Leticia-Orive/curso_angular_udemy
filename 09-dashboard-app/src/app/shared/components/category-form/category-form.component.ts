import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ICategory } from '../../../models/category.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {

  @Input() category?: ICategory;

  private formBuilder = inject(FormBuilder);
  public formCategory: FormGroup = new FormGroup({});

  @Output() submitForm = new EventEmitter<ICategory>();

  ngOnInit(){
    this.formCategory = this.formBuilder.group({
      _id: new FormControl(this.category?._id),

      name: new FormControl(this.category ? this.category.name : '', Validators.required),

      order: new FormControl(this.category ? this.category.order : 0),

      parent: new FormControl(this.category && this.category.parent ? this.category.parent as ICategory : null)

    })
  }

  submit(){
    const category = this.formCategory.value as ICategory;
    this.submitForm.emit(category);
  }

}
