import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IPage } from '../../../../models/page.model';
import { IPost } from '../../../../models/post.model';
import { PostsState } from '../../../../state/posts/posts.state';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {

  private store = inject(Store)

  // Paginacion de posts
  public pagination$: Observable<IPage<IPost> | null> = this.store.select(PostsState.pagination)
}
