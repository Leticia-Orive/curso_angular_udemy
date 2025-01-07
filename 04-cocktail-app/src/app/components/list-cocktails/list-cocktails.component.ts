import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilter } from '../../models/filter.model';
import { CocktailService } from '../../services/cocktail.service';
import { ICocktail } from '../../models/cocktail.model';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-cocktails',
  standalone: true,
  imports: [FormsModule, RouterLink, NgxPaginationModule],
  templateUrl: './list-cocktails.component.html',
  styleUrl: './list-cocktails.component.scss'
})
export class ListCocktailsComponent {
  // Servicios
  private cocktailService = inject(CocktailService);

  // Cocktails
  public listCocktails: ICocktail[] = [];
  // Indica si se ha realizado alguna busqueda o no
  public searched: boolean = false;
  // Indica si se han cargado los cocktails
  public loadCocktails: boolean = true;
  // Pagina actual
  public currentPage = 1; 
  // Items por página
  public itemsPerPage = 12;

  public filter: IFilter = {
    searchBy: 'name',
    value: ''
  }

  /**
   * Filtra y obtiene cocktails
   */
  filterData() {
    console.log(this.filter);
    // Indicamos que se ha buscado
    this.searched = true;
    // Marcamos a false para que se actuve el spinner
    this.loadCocktails = false;
    // Filtramos los cocktails
    this.cocktailService.getCocktails(this.filter).subscribe({
      next: (listCocktails: ICocktail[]) => {
        this.listCocktails = listCocktails;
      },
      error: (error) => {
        console.error(error);
        this.loadCocktails = true;
      },
      complete: () => {
        this.loadCocktails = true;
      }
    })

  }

  /**
   * Cambia de pagina
   * @param page 
   */
  pageChange(page: number){
    this.currentPage = page;
  }

}
