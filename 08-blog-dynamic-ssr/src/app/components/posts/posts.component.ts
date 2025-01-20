import { Component, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { IPage } from '../../models/page.model';
import { IPost } from '../../models/post.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [DatePipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  private route = inject(ActivatedRoute);
  public pagination!: IPage<IPost>;
  public posts: IPost[] = [];

  ngOnInit(){
    this.route.data.subscribe({
      next: (data: Data['posts']) => {
        console.log(data['posts']);
        this.pagination = data['posts'];
        this.posts = this.pagination.content;
      }
    })
  }

}
