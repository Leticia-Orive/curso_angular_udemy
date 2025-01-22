import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../models/post.model';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { SanitizeHtmlPipe } from '../../pipes/sanitize-html.pipe';
import { EnvironmentPipe } from '../../pipes/environment.pipe';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    DatePipe, 
    SanitizeHtmlPipe, 
    NgOptimizedImage, 
    EnvironmentPipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  private route = inject(ActivatedRoute)
  private meta = inject(Meta);

  public post!: IPost;

  ngOnInit(){

    // Obtenemos el post
    this.post = this.route.snapshot.data['post'];
    console.log(this.post);

    // Añadimos el tag title
    this.meta.addTag({
      name: 'title',
      content: this.post.title
    })
    
  }

  ngOnDestroy(){
    // eliminamos el tag añadido
    this.meta.removeTag('name=title')
  }

}
