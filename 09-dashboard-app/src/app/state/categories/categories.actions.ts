export class GetCategoriesAction {
  static readonly type = '[Categories] Get categories paginated';
  constructor(public payload: {page: number, q?: string, sortBy?: string, sort?: string }) { }
}
