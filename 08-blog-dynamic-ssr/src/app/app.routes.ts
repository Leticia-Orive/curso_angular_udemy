import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadComponent: () => import('./components/posts/posts.component').then(c => c.PostsComponent)
    },
    {  path: 'category/:id/:name', loadComponent: () => import('./components/posts/posts.component').then(c => c.PostsComponent)},
    {  path: 'post/:id/:name', loadComponent: () => import('./components/post/post.component').then(c => c.PostComponent)},
    {  path: 'search', loadComponent: () => import('./components/posts/posts.component').then(c => c.PostsComponent)},
];
