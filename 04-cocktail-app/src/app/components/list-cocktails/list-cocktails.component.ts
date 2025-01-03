import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilter } from '../../models/filter.model';
import { CocktailService } from '../../services/cocktail.service';

@Component({
  selector: 'app-list-cocktails',
  imports: [FormsModule],
  templateUrl: './list-cocktails.component.html',
  styleUrl: './list-cocktails.component.scss'
})
export class ListCocktailsComponent {
  private cocktailService = inject(CocktailService);
  public filter: IFilter = {
    searchBy: 'name', 
    value: ''
  };

  filterData(){
    console.log(this.filter);
    this.cocktailService.getCocktails(this.filter).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error) =>{
        console.error(error);

      },
      complete: () => {
        
      }

    });
  }

}
