import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { PostsAction } from './posts.actions';
import { IPage } from '../../models/page.model';
import { IPost } from '../../models/post.model';

export class PostsStateModel {
  public pagination!: IPage<IPost> | null;
}

const defaults = {
  pagination: null
};

@State<PostsStateModel>({
  name: 'posts',
  defaults
})
@Injectable()
export class PostsState {

  @Selector()
  static pagination(state: PostsStateModel) {
    return state.pagination
  }


  @Action(PostsAction)
  add({ getState, setState }: StateContext<PostsStateModel>, { payload }: PostsAction) {
    
  }
}
