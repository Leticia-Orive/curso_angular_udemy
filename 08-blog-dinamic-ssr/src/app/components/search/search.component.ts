import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  private router = inject(Router)

  public showSearch: boolean = false;

  /**
   * Muestra el buscador
   */
  openInputSearch(){
    this.showSearch = true;
  }

  /**
   * Oculta el buscador
   */
  closeInputSearch(){
    this.showSearch = false;
  }

  /**
   * Buscamos las entradas
   * @param value 
   */
  searchPosts(value: string){
    this.router.navigate(['search'], {
      queryParams: { q: value }
    })
    this.closeInputSearch();
  }

}
