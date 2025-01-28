import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetCategoryByIdAction } from '../../../../../../state/categories/categories.actions';
import { CategoriesState } from '../../../../../../state/categories/categories.state';
import { Observable } from 'rxjs';
import { ICategory } from '../../../../../../models/category.model';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-update-category',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent {

  @Input() id!: string;

  private store = inject(Store)

  public category$: Observable<ICategory | null> = this.store.select(CategoriesState.categorySelected)


  ngOnInit(){
    console.log(this.id);
    this.store.dispatch(new GetCategoryByIdAction({id: this.id}))
  }

}
