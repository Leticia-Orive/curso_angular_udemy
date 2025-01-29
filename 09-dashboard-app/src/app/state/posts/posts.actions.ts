export class PostsAction {
  static readonly type = '[Posts] Add item';
  constructor(public payload: string) { }
}
