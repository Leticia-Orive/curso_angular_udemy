import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilter } from '../../models/filter.model';
import { CocktailService } from '../../services/cocktail.service';
import { ICocktail } from '../../models/cocktail.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-cocktails',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './list-cocktails.component.html',
  styleUrl: './list-cocktails.component.scss'
})
export class ListCocktailsComponent {
  private cocktailService = inject(CocktailService);

  public listCocktails: ICocktail[] = [];
  public searched: boolean = false;

  public filter: IFilter = {
    searchBy: 'name', 
    value: ''
  };

  filterData(){
    console.log(this.filter);
    this.searched = true;
    this.cocktailService.getCocktails(this.filter).subscribe({
      next: (ListCocktails: ICocktail[]) => {
        this.listCocktails = ListCocktails;
      },
      error: (error) =>{
        console.error(error);

      },
      complete: () => {
        
      }

    });
  }

}
