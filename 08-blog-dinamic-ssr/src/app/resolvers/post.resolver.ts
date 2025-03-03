import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { IPost } from '../models/post.model';

export const postResolver: ResolveFn<IPost> = (route, state) => {
  const postsService = inject(PostsService);
  // Id del post
  const idPost = route.paramMap.get('id')!;
  return postsService.getPostById(idPost);
};
