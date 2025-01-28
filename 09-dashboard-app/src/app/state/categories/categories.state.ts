import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {  GetAllCategoriesAction, GetCategoriesAction } from './categories.actions';
import { IPage } from '../../models/page.model';
import { ICategory } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { tap } from 'rxjs';

export class CategoriesStateModel {
  public pagination!: IPage<ICategory> | null;
  public allCategories!: ICategory[]
}

const defaults = {
  pagination: null,
  allCategories: [],
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

  @Selector()
  static allCategories(state: CategoriesStateModel) {
    return state.allCategories;
  }

  private categoryService = inject(CategoryService)

  @Action(GetCategoriesAction)
  getCategories({ patchState }: StateContext<CategoriesStateModel>, { payload }: GetCategoriesAction) {
    return this.categoryService.getCategories(payload.page, payload.q, payload.sortBy, payload.sort).pipe(
      tap((pagination: IPage<ICategory>) => {
        patchState({
          pagination
        })
      })
    ) 
  }

  @Action(GetAllCategoriesAction)
  getAllCategories({ patchState }: StateContext<CategoriesStateModel> ) {
    return this.categoryService.getAllCategories().pipe(
      tap((categories: ICategory[]) => {
        patchState({
          allCategories: categories
        })
      })
    )

  }
}
