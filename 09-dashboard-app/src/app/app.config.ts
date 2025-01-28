import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideStore, Store } from '@ngxs/store';
import { AuthState } from './state/auth/auth.state';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { CheckAuthAction } from './state/auth/auth.actions';
import { CategoriesState } from './state/categories/categories.state';
import { refreshTokenInterceptor } from './interceptors/refresh-token.interceptor';



export function checkAuth(store: Store) {
  return () => store.dispatch(new CheckAuthAction())
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()),// withComponentInputBinding() is a function that returns a function
    provideAnimations(),
    provideToastr(), 
    provideStore([
      AuthState,
      CategoriesState
      
    ]),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        refreshTokenInterceptor
        
      ])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: checkAuth,
      multi: true,
      deps: [Store]
    }
  ]
};
