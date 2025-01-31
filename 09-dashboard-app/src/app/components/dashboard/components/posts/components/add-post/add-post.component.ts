import { Component, inject } from '@angular/core';
import { PostFormComponent } from '../../../../../../shared/components/post-form/post-form.component';
import { IPost } from '../../../../../../models/post.model';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { CreatePostAction } from '../../../../../../state/posts/posts.actions';


@Component({
  selector: 'app-add-post',
  imports: [PostFormComponent],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  private store = inject(Store)
  private router = inject(Router)
  private toatrService = inject(ToastrService)
  

  createPost(post: IPost){
    console.log(post);

    this.store.dispatch(new CreatePostAction({ post })).subscribe({
      next: () => {
        this.toatrService.success(
          'Post añadido',
          'Éxito'
        )
        this.router.navigate(['/dashboard', 'posts']);
      }, error: (error) => {
        console.error(error);
        this.toatrService.error(
          'Error al añadir el post',
          'Error'
        )
      }
    })
    
    

  }

}
