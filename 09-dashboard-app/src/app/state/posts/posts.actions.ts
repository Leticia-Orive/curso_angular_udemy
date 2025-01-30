import { TSort } from "../../shared/components/table-data/types/sort.type";

export class GetPostsAction {
  static readonly type = '[Posts] Get Posts paginated';
  constructor(public payload: { page: number, q?: string, sortBy?: string, sort?: TSort }) { }
}