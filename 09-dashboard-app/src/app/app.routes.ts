import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from './components/dashboard/components/posts/posts.component';
import { AddPostComponent } from './components/dashboard/components/posts/components/add-post/add-post.component';
import { UpdatePostComponent } from './components/dashboard/components/posts/components/update-post/update-post.component';
import { CategoriesComponent } from './components/dashboard/components/categories/categories.component';
import { AddCategoryComponent } from './components/dashboard/components/categories/components/add-category/add-category.component';
import { UpdateCategoryComponent } from './components/dashboard/components/categories/components/update-category/update-category.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'posts',
                
                children: [
                    {
                        path: '',
                        component: PostsComponent
                    },
                    {
                        path: 'add',
                        component: AddPostComponent
                    },
                    {
                        path: 'update/:id',
                        component: UpdatePostComponent
                    }
                ]
            },
            {
                path: 'categories',
                
                children: [
                    {
                        path: '',
                        component: CategoriesComponent
                    },
                    {
                        path: 'add',
                        component: AddCategoryComponent
                    },
                    {
                        path: 'update/:id',
                        component: UpdateCategoryComponent
                    }
                ]
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: 'dashboard/categories'
    }
];
