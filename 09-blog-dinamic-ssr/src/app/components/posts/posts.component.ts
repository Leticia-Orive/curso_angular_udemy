
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, RouterLink } from '@angular/router';
import { IPage } from '../../models/page.model';
import { IPost } from '../../models/post.model';
import { DatePipe, NgClass, NgOptimizedImage, SlicePipe } from '@angular/common';
import { EnvironmentPipe } from '../../pipes/environment.pipe';

import { Subject, takeUntil } from 'rxjs';
import { SlugifyPipe } from '../../pipes/slugify.pipe';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    DatePipe, 
    SlicePipe, 
    EnvironmentPipe, 
    NgOptimizedImage,
    SlugifyPipe, 
   
    RouterLink, 
    
    NgClass
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {

  private route = inject(ActivatedRoute);

  public pagination!: IPage<IPost>;
  public posts: IPost[] = [];
  public pages: number[] = [];
  public currentPage: number = 1;

  private unsubscribe$ = new Subject<void>();

  ngOnInit(){

    // Nos subscribimos a data para los cambios de datos
    this.route.data.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (data: Data) => {
        console.log(data['posts']);
        this.pagination = data['posts'];
        this.posts = this.pagination.content;
        console.log(...Array(this.pagination.totalPages).keys());
        this.pages = [...Array(this.pagination.totalPages).keys()].map(key => key + 1);
      }
    });

    // Nos subscribimos a los queryparams para detectar el cambio de pagina
    this.route.queryParamMap.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (params: ParamMap) => {
        this.currentPage = +params.get('page')! || 1;
      }
    })

  }

  ngOnDestroy(){
    // Nos desubscribimos
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}