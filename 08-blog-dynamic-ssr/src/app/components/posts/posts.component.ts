import { Component, inject } from '@angular/core';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  private route = inject(ActivatedRoute);

  
  ngOnInit(){

    // Nos subscribimos a data para los cambios de datos
    this.route.data.subscribe({
      next: (data: Data) => {
        console.log(data['posts']);
        
      }
    });

  }


}
