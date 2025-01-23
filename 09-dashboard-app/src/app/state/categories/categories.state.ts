import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {  GetCategoriesAction } from './categories.actions';
import { IPage } from '../../models/page.model';
import { ICategory } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { tap } from 'rxjs';

export class CategoriesStateModel {
  public pagination!: IPage<ICategory> | null;
}

const defaults = {
  pagination: null
};

@State<CategoriesStateModel>({
  name: 'categories',
  defaults
})
@Injectable()
export class CategoriesState {

  @Selector()
  static pagination(state: CategoriesStateModel) {
    return state.pagination;
  }

  private categoryService = inject(CategoryService)

  @Action(GetCategoriesAction)
  add({ patchState }: StateContext<CategoriesStateModel>, { payload }: GetCategoriesAction) {
    return this.categoryService.getCategories(payload.page, payload.q, payload.sortBy, payload.sort).pipe(
      tap((pagination: IPage<ICategory>) => {
        patchState({
          pagination
        })

      })
    )
    
  }
}
