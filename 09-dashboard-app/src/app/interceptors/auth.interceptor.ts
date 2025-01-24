import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AUTH_COOKIE } from '../constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const cookieService = inject(CookieService)

  // Si tenemos la cookie AUTH, añadimos el header Authorization
  if(cookieService.check(AUTH_COOKIE)){
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${cookieService.get(AUTH_COOKIE)}`
      },
      withCredentials: true
    })
    return next(authReq);
  }
  
  return next(req);
};
