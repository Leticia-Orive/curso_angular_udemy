import { Component, inject } from '@angular/core';
import { PostFormComponent } from '../../../../../../shared/components/post-form/post-form.component';
import { IPost } from '../../../../../../models/post.model';


@Component({
  selector: 'app-add-post',
  imports: [PostFormComponent],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  

  createPost(post: IPost){
    console.log(post);
    
    

  }

}
