import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CreatePostAction, GetPostsAction,  } from './posts.actions';
import { IPage } from '../../models/page.model';
import { IPost } from '../../models/post.model';
import { tap } from 'rxjs';
import { PostService } from '../../services/post.service';

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
  private postsService = inject(PostService)

  @Action(GetPostsAction)
  getPosts({ patchState }: StateContext<PostsStateModel>, { payload }: GetPostsAction) {
    return this.postsService.getPosts(payload.page, payload.q, payload.sortBy, payload.sort).pipe(
      tap((pagination: IPage<IPost>) => {
        patchState({
          pagination
        })
      })
    )
  }

  @Action(CreatePostAction)
  createPost({ }: StateContext<PostsStateModel>, { payload }: CreatePostAction) {
    return this.postsService.createPost(payload.post);
  }
}
