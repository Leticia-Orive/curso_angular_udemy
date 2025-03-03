import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { PostsState } from '../../../../../../state/posts/posts.state';
import { IPost } from '../../../../../../models/post.model';
import { Observable } from 'rxjs/internal/Observable';
import { ClearPostSelectedAction, GetPostByIdAction, UpdatePostAction} from '../../../../../../state/posts/posts.actions';

import { AsyncPipe } from '@angular/common';
import { PostFormComponent } from '../../../../../../shared/components/post-form/post-form.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [AsyncPipe, PostFormComponent],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.scss'
})
export class UpdatePostComponent {

  // id obtenido por la ruta
  @Input() id!: string;

  private store = inject(Store)
  private router = inject(Router)
  private toastrService = inject(ToastrService)

  // Observable para obtener el post
  public post$: Observable<IPost | null> = this.store.select(PostsState.postSelected)

  ngOnInit(){
    this.store.dispatch(new GetPostByIdAction({ id: this.id }))
  }

 updatePost(post: IPost){
  this.store.dispatch(new UpdatePostAction({ post })).subscribe({
    next: () => {
      this.toastrService.success(
        'Se ha actualizado la entrada',
        'Éxito'
      )
       // Volvemos al post
       this.router.navigate(['/dashboard', 'posts'])

    }, error: (error) => {
      console.error(error);
        this.toastrService.error(
          'No se ha actualizado la entrada',
          'Error'
        )

    }
  })

  
 }

  ngOnDestroy(){
    // limpiamos el post seleccionado
    this.store.dispatch(new ClearPostSelectedAction());
  }

}
