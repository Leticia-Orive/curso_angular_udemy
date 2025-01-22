import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { IPage } from '../models/page.model';
import { IPost } from '../models/post.model';

export const postsCategoryResolver: ResolveFn<IPage<IPost>> = (route, state) => {
  const postsService = inject(PostsService);
  // id de la categoria
  const idCategory = route.paramMap.get('id')!;
  // query page
  const page = +route.queryParamMap.get('page')! || 1;
  return postsService.getPosts(page, undefined, idCategory);
};
