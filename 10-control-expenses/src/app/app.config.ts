import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(),
    provideToastr(), 
    provideFirebaseApp(() => initializeApp
    ({ projectId: "control-expenses-ddd75", appId: "1:163533585496:web:35238f455746938d21de2d", 
      storageBucket: "control-expenses-ddd75.firebasestorage.app", apiKey: "AIzaSyCerwVtGhTEmWCVTRDn1mQVJCa-FiwTChc", 
      authDomain: "control-expenses-ddd75.firebaseapp.com", messagingSenderId: "163533585496" })),
       provideAuth(() => getAuth()), 
       provideFirestore(() => getFirestore()),
    ]
};
