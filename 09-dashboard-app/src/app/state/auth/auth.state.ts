import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {  CheckAuthAction, LoginAction, LogoutAction, RefreshTokenAction } from './auth.actions';
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

  @Selector()
  static isAuthenticated(state: AuthStateModel) {
    return state.isAuthenticated;
  }

  private authService = inject(AuthService);
  private cookieService = inject(CookieService)
  private router = inject(Router)

  @Action(LoginAction)
  login({ setState }: StateContext<AuthStateModel>, { payload }: LoginAction) {
    return this.authService.login(payload.authCredentials).pipe(
      tap( (authToken: IAuthToken) => {
        // Seteamos la cookie AUTH
        this.cookieService.set(AUTH_COOKIE, authToken.accessToken, authToken.accessTokenExpires, '/', undefined, false, 'Strict')
        // Seteamos la cookie REFRESH
        this.cookieService.set(REFRESH_COOKIE, authToken.refreshToken, authToken.refreshTokenExpires, '/', undefined, false, 'Strict')
        // Indicamos que estamos autenticados
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

  @Action(CheckAuthAction)
  checkAuth({ setState }: StateContext<AuthStateModel>) {
    // Comprobamos si estamos logueados
    setState({
      isAuthenticated: this.cookieService.check(AUTH_COOKIE)
    })
  }

  @Action(RefreshTokenAction)
  refreshToken({ }: StateContext<AuthStateModel>, { payload }: RefreshTokenAction) {
    return this.authService.refreshToken(payload.refreshToken).pipe(
      tap( (authToken: IAuthToken) => {
        // Seteamos la cookie AUTH de nuevo
        this.cookieService.set(AUTH_COOKIE, authToken.accessToken, authToken.accessTokenExpires, '/', undefined, false, 'Strict')
        // Seteamos la cookie REFRESH de nuevo
        this.cookieService.set(REFRESH_COOKIE, authToken.refreshToken, authToken.refreshTokenExpires, '/', undefined, false, 'Strict')
      })
    )
  }
}
