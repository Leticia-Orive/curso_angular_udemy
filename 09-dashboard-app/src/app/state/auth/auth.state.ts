import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import {  LoginAction, LogoutAction } from './auth.actions';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';
import { IAuthToken } from '../../models/auth.model';
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router';
import { AUTH_COOKIE, REFRESH_COOKIE } from '../../constants';

export class AuthStateModel {
  public isAuthenticated!: boolean;
}

const defaults = {
  isAuthenticated: false
};

@State<AuthStateModel>({
  name: 'auth',
  defaults
})
@Injectable()
export class AuthState {

  private authService = inject(AuthService);
  private cookieService = inject(CookieService)
  private router = inject(Router)

  @Action(LoginAction)
  login({ setState }: StateContext<AuthStateModel>, { payload }: LoginAction) {
    return this.authService.login(payload.authCredentials).pipe(
      tap( (authToken: IAuthToken) => {
        this.cookieService.set(AUTH_COOKIE, authToken.accessToken, authToken.accessTokenExpires, '/', undefined, false, 'Strict')
        this.cookieService.set(REFRESH_COOKIE, authToken.refreshToken, authToken.refreshTokenExpires, '/', undefined, false, 'Strict')
        setState({
          isAuthenticated: true
        })
        this.router.navigateByUrl('dashboard/categories')
      })
    )
  }

  @Action(LogoutAction)
  logout({ setState }: StateContext<AuthStateModel>) {
    return this.authService.logout().pipe(
      tap( () => {
        // Borramos las cookies
        this.cookieService.delete(AUTH_COOKIE, '/', undefined, false, 'Strict')
        this.cookieService.delete(REFRESH_COOKIE, '/', undefined, false, 'Strict')
        // Indicamos que no estamos autenticados
        setState({
          isAuthenticated: false
        })
        this.router.navigateByUrl('login')
      })
    )
  }
}
