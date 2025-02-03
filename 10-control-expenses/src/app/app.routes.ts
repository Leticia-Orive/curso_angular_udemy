import { Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { LoginComponent } from './components/login/login.component';
import { RegistriesComponent } from './components/registries/registries.component';

export const routes: Routes = [
    {
        path: 'registries',
        component: RegistriesComponent,
        
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        
    },
    {
        path: 'graphics',
        component: GraphicsComponent,
       
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'create-account',
        component: CreateAccountComponent
    },
    {
        path: '**',
        redirectTo: 'registries'
    }
];
