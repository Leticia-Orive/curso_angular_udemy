import { Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { LoginComponent } from './components/login/login.component';
import { RegistriesComponent } from './components/registries/registries.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login'])

export const routes: Routes = [
    {
        path: 'registries',
        component: RegistriesComponent,
        canActivate: [AuthGuard],
        data: {
            authGuardPipe: redirectToLogin
        }
        
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard],
        data: {
            authGuardPipe: redirectToLogin
        }
        
    },
    {
        path: 'graphics',
        component: GraphicsComponent,
        canActivate: [AuthGuard],
        data: {
            authGuardPipe: redirectToLogin
        }
       
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
