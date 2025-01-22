import { Component, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../models/post.model';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { SanitizeHtmlPipe } from '../../pipes/sanitize-html.pipe';
import { EnvironmentPipe } from '../../pipes/environment.pipe';

@Component({
  selector: 'app-post',
  imports: [DatePipe, SanitizeHtmlPipe, NgOptimizedImage, EnvironmentPipe],
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
