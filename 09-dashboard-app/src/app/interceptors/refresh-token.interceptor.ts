import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { catchError, switchMap, throwError } from 'rxjs';
import { REFRESH_COOKIE, AUTH_COOKIE } from '../constants';
import { IRefreshToken } from '../models/refresh-token.model';
import { RefreshTokenAction, LogoutAction } from '../state/auth/auth.actions';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const cookieService = inject(CookieService)
  const store = inject(Store)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // Si el error es 401 y la cookie REFRESH
      if (error.status === 401 && cookieService.check(REFRESH_COOKIE)) {
        //Objecto
        const refreshToken: IRefreshToken = {
          refreshToken: cookieService.get(REFRESH_COOKIE)
        }
        // Refrescamos el token
        return store.dispatch(new RefreshTokenAction({
          refreshToken
        })).pipe(
          switchMap(() => {

            // Creamos una nueva cabecera Authorization
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${cookieService.get(AUTH_COOKIE)}`
              }
            })

            return next(newReq)
          }),
          catchError(err => {
            store.dispatch(new LogoutAction())
            return throwError(() => err)
          })
        )
      }

      return throwError(() => error)

    })
  );
};
