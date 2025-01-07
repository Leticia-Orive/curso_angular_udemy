import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-detail-cocktails',
  imports: [],
  templateUrl: './detail-cocktails.component.html',
  styleUrl: './detail-cocktails.component.scss'
})
export class DetailCocktailsComponent {

  private activatedRoute = inject(ActivatedRoute);
  
  ngOnInit(){

    this.activatedRoute.params.pipe(
      first()
     ).subscribe({
      next: (params: Params)=>{
        const id = params['id'];
        console.log(id);
      }
     })
    }
}
