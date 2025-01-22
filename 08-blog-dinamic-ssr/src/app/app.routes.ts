import { Routes } from '@angular/router';
import { postsAllResolver } from './resolvers/posts-all.resolver';
import { postsCategoryResolver } from './resolvers/posts-category.resolver';
import { postResolver } from './resolvers/post.resolver';
import { postsSearchResolver } from './resolvers/posts-search.resolver';

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
        resolve: {
            posts: postsCategoryResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
    },
    {
        path: 'post/:id/:name',
        loadComponent: () => import('./components/post/post.component').then(c => c.PostComponent),
        resolve: {
            post: postResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
    },
    {
        path: 'search',
        loadComponent: () => import('./components/posts/posts.component').then(c => c.PostsComponent),
        resolve: {
            posts: postsSearchResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
    }
];

