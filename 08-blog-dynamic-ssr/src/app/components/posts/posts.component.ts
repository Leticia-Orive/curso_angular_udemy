import { DatePipe, SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IPage } from '../../models/page.model';
import { IPost } from '../../models/post.model';


@Component({
  selector: 'app-posts',
  imports: [DatePipe, SlicePipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  private route = inject(ActivatedRoute);

  public pagination!: IPage<IPost>;
  public posts: IPost[] = [];

  
  ngOnInit(){

    // Nos subscribimos a data para los cambios de datos
    this.route.data.subscribe({
      next: (data: Data) => {
        console.log(data['posts']);
        this.pagination = data['posts'];
        this.posts = this.pagination.content;
        
      }
    });

  }


}
