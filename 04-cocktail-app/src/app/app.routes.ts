import { Routes } from '@angular/router';
import { ListCocktailsComponent } from './components/list-cocktails/list-cocktails.component';
import { DetailCocktailsComponent } from './components/detail-cocktails/detail-cocktails.component';

export const routes: Routes = [
    {path: 'list-cocktails', component: ListCocktailsComponent},
    {path: 'detail-cocktail/:id', component: DetailCocktailsComponent}, //los :id son parametros dinamicos
    {path: '**',  redirectTo: 'list-cocktails'}
];
