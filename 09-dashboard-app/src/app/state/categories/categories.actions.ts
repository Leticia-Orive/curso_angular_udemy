import { ICategory } from "../../models/category.model";

export class GetCategoriesAction {
  static readonly type = '[Categories] Get categories paginated';
  constructor(public payload: {page: number, q?: string, sortBy?: string, sort?: string }) { }
}
  export class GetAllCategoriesAction {
    static readonly type = '[Categories] Get all categories';
  }

  export class CreateCategoryAction {
    static readonly type = '[Categories] Create category';
    constructor(public payload: { category: ICategory }) { }
  }

