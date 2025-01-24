import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AUTH_COOKIE, REFRESH_COOKIE } from '../constants';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { LogoutAction } from '../state/auth/auth.actions';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService)
  // Obtenemos la cookie AUTH
  const authToken = cookieService.get(AUTH_COOKIE);

  // Si no existe, nos deslogueamos
  if(!authToken) {
    const store = inject(Store)
    store.dispatch(new LogoutAction());
    return false;
  }

  try {
    // Decodificamos el token
  const decodedToken = jwtDecode(authToken);

  // Tiempo actual en segundos
 const currentTime =Math.floor(Date.now() / 1000);

 // Sino existe o el tiempo del token en menor, nos deslogueamos
 if(!decodedToken.exp || (decodedToken.exp < currentTime)) {

  // Obtenemos la cookie REFRESH
  const refreshToken = cookieService.get(REFRESH_COOKIE);

  if(refreshToken){
    const decodedRefreshToken = jwtDecode(refreshToken);
    // Sino existe o el tiempo del token en menor, nos deslogueamos
    if(!decodedRefreshToken.exp || (decodedRefreshToken.exp < currentTime)){
      const store = inject(Store)
      store.dispatch(new LogoutAction());
      return false;
    }

  }else{
    const store = inject(Store)
    store.dispatch(new LogoutAction());
    return false;
  }
  
 }

  }catch(error){
    const store = inject(Store)
   store.dispatch(new LogoutAction());
   return false;

  }
  
  return true;
};
