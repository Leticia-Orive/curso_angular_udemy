import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first, switchMap } from 'rxjs';
import { CocktailService } from '../../services/cocktail.service';
import { ICocktail } from '../../models/cocktail.model';

@Component({
  selector: 'app-detail-cocktails',
  imports: [],
  templateUrl: './detail-cocktails.component.html',
  styleUrl: './detail-cocktails.component.scss'
})
export class DetailCocktailsComponent {

  private activatedRoute = inject(ActivatedRoute);
  private cocktailService = inject(CocktailService);

  public cocktail!: ICocktail;
  public loadCocktail: boolean = false;
  ngOnInit(){

    this.activatedRoute.params.pipe(
      first(),
      switchMap((params: Params) => {
        // Recogemos el id de la URL
        const id = params['id'];
        console.log(id);
        return this.cocktailService.getCocktailById(id)
      })
     ).subscribe({
      next: (cocktail: ICocktail)=>{
        this.cocktail = cocktail
        console.log(cocktail);
        },
        complete:(()=>{
          this.loadCocktail = true;
      })
    })
  }  
}
