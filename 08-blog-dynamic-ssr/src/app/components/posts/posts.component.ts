import { Component, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  private route = inject(ActivatedRoute);

  ngOnInit(){
    this.route.data.subscribe({
      next: (data: Data['posts']) => {
        console.log(data['posts']);
      }
    })
  }

}
