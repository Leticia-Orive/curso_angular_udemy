import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import { provideStore } from '@ngxs/store';
import { AuthState } from './state/auth/auth.state';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(),//requiered for animations
    provideToastr(),//Toastr providers
     provideStore([
      AuthState
     ],), 
     provideHttpClient()
  ]
};
