import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilter } from '../../models/filter.model';

@Component({
  selector: 'app-list-cocktails',
  imports: [FormsModule],
  templateUrl: './list-cocktails.component.html',
  styleUrl: './list-cocktails.component.scss'
})
export class ListCocktailsComponent {
  public filter: IFilter = {
    searchBy: 'name', 
    value: ''
  };

  filterData(){
    console.log(this.filter);
  }

}
