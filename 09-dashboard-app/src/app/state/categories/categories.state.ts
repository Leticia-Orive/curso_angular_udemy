import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {  ClearCategorySelectedAction, CreateCategoryAction, GetAllCategoriesAction, GetCategoriesAction, GetCategoryByIdAction, UpdateCategoryAction } from './categories.actions';
import { IPage } from '../../models/page.model';
import { ICategory } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { tap } from 'rxjs';

export class CategoriesStateModel {
  public pagination!: IPage<ICategory> | null;
  public allCategories!: ICategory[]
  public categorySelected!: ICategory | null
}

const defaults = {
  pagination: null,
  allCategories: [],
  categorySelected: null
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
  @Selector()
  static categorySelected(state: CategoriesStateModel) {
    return state.categorySelected;
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

  @Action(GetCategoryByIdAction)
  getCategoryById({ patchState }: StateContext<CategoriesStateModel>, { payload }: GetCategoryByIdAction) {
    return this.categoryService.getCategoryById(payload.id).pipe(
      tap((category: ICategory) => {
        patchState({
          categorySelected: category
        })
      })
    )

  }

  @Action(CreateCategoryAction)
  createCategory({  }: StateContext<CategoriesStateModel>, { payload }: CreateCategoryAction) {
    return this.categoryService.createCategory(payload.category)
      
  }
  @Action(UpdateCategoryAction)
  updateCategory({ }: StateContext<CategoriesStateModel>, { payload }: UpdateCategoryAction) {
    return this.categoryService.updateCategory(payload.category);
  }

  @Action(ClearCategorySelectedAction)
  clearCategorySelected({ patchState }: StateContext<CategoriesStateModel>) {
    patchState({
      categorySelected: null
    })
  }
}
