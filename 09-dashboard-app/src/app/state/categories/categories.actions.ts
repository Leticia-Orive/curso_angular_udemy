import { ICategory } from "../../models/category.model";
import { TSort } from "../../shared/components/table-data/types/sort.type";

export class GetCategoriesAction {
  static readonly type = '[Categories] Get categories paginated';
  constructor(public payload: {page: number, q?: string, sortBy?: string, sort?: TSort }) { }
}
  export class GetAllCategoriesAction {
    static readonly type = '[Categories] Get all categories';
  }

  export class GetCategoryByIdAction {
    static readonly type = '[Categories] Get category by ID';
    constructor(public payload: { id: string }) { }
  }

  export class CreateCategoryAction {
    static readonly type = '[Categories] Create category';
    constructor(public payload: { category: ICategory }) { }
  }
  export class UpdateCategoryAction {
    static readonly type = '[Categories] Update category';
    constructor(public payload: { category: ICategory }) { }
  }
  export class ClearCategorySelectedAction {
    static readonly type = '[Categories] Clear category selected';
  }

  export class DeleteCategoriesAction {
    static readonly type = '[Categories] Delete categories';
    constructor(public payload: { ids: string[] }) { }
  }
