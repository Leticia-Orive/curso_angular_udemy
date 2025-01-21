import { Routes } from '@angular/router';
import { postsAllResolver } from './resolvers/posts-all.resolver';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/posts/posts.component').then(c => c.PostsComponent),
        resolve: {
            posts: postsAllResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'

        
    },
    {
        path: 'category/:id/:name',
        loadComponent: () => import('./components/posts/posts.component').then(c => c.PostsComponent),
        
    },
    {
        path: 'post/:id/:name',
        loadComponent: () => import('./components/post/post.component').then(c => c.PostComponent),
       
    },
    {
        path: 'search',
        loadComponent: () => import('./components/posts/posts.component').then(c => c.PostsComponent),
        
    }
];

