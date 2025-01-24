import { HttpBackend, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IAuth, IAuthToken } from '../models/auth.model';
import { first } from 'rxjs';
import { IRefreshToken } from '../models/refresh-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpBackend = inject(HttpBackend); // usado para saltarse los interceptors
  private http = new HttpClient(this.httpBackend);
  private URL_BASE = `${environment.urlServer}/v1/auth`

  login(authCredentials: IAuth){
    return this.http.post<IAuthToken>(`${this.URL_BASE}/login`, authCredentials).pipe(first())
  }

  logout(){
    return this.http.post(`${this.URL_BASE}/logout`, {}).pipe(first())
  }

  refreshToken(refreshToken: IRefreshToken){
    return this.http.post<IAuthToken>(`${this.URL_BASE}/refresh-token`, refreshToken).pipe(first())
  }

}
