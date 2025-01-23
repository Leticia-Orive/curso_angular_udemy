import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuth, IAuthToken } from '../models/auth.model';
import { first } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private URL_BASE = `${environment.urlServer}/v1/auth`

  login(authCredentials: IAuth){
    return this.http.post<IAuthToken>(`${this.URL_BASE}/login`, authCredentials).pipe(first())
  }
}
