import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ClearPostSelectedAction, CreatePostAction, DeletePostsAction, GetPostByIdAction, GetPostsAction, UpdatePostAction,  } from './posts.actions';
import { IPage } from '../../models/page.model';
import { IPost } from '../../models/post.model';
import { tap } from 'rxjs';
import { PostService } from '../../services/post.service';

export class PostsStateModel {
  public pagination!: IPage<IPost> | null;
  public postSelected!: IPost | null
}

const defaults = {
  pagination: null,
  postSelected: null
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
  @Selector()
  static postSelected(state: PostsStateModel) {
    return state.postSelected
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
  @Action(UpdatePostAction)
  updatePost({ }: StateContext<PostsStateModel>, { payload }: UpdatePostAction) {
    return this.postsService.updatePost(payload.post);
  }
  @Action(DeletePostsAction)
  deletePosts({ }: StateContext<PostsStateModel>, { payload }: DeletePostsAction) {
    return this.postsService.deletePosts(payload.ids);
  }

  @Action(GetPostByIdAction)
  getPostById({ patchState }: StateContext<PostsStateModel>, { payload }: GetPostByIdAction) {
    return this.postsService.getPostById(payload.id).pipe(
      tap((post: IPost) => {
        patchState({
          postSelected: post
        })
      })
    )
  }
  @Action(ClearPostSelectedAction)
  clearPostSelected({ patchState }: StateContext<PostsStateModel>) {
    patchState({
      postSelected: null
    })
  }
}
