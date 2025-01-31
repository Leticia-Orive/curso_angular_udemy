import { IPost } from "../../models/post.model";
import { TSort } from "../../shared/components/table-data/types/sort.type";

export class GetPostsAction {
  static readonly type = '[Posts] Get Posts paginated';
  constructor(public payload: { page: number, q?: string, sortBy?: string, sort?: TSort }) { }
}

export class CreatePostAction {
  static readonly type = '[Posts] Create Post';
  constructor(public payload: { post: IPost }) { }
}