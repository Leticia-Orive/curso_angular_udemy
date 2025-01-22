import { Component, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../models/post.model';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  private route = inject(ActivatedRoute)
  

  public post!: IPost;

  ngOnInit(){

    // Obtenemos el post
    this.post = this.route.snapshot.data['post'];
    console.log(this.post);

    
    
  }

  

}
