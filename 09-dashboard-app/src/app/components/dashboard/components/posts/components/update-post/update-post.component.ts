import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { PostsState } from '../../../../../../state/posts/posts.state';
import { IPost } from '../../../../../../models/post.model';
import { Observable } from 'rxjs/internal/Observable';
import { ClearPostSelectedAction, GetPostByIdAction } from '../../../../../../state/posts/posts.actions';

import { AsyncPipe, JsonPipe } from '@angular/common';


@Component({
  selector: 'app-update-post',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.scss'
})
export class UpdatePostComponent {

  // id obtenido por la ruta
  @Input() id!: string;

  private store = inject(Store)
 

  // Observable para obtener el post
  public post$: Observable<IPost | null> = this.store.select(PostsState.postSelected)

  ngOnInit(){
    this.store.dispatch(new GetPostByIdAction({ id: this.id }))
  }

  

  ngOnDestroy(){
    // limpiamos el post seleccionado
    this.store.dispatch(new ClearPostSelectedAction());
  }

}
