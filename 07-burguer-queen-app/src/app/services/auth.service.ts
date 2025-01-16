import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IUser } from '../models/user.model';
import { IAuthCredentials } from '../models/auth-credentials';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_BASE = `${environment.urlServer}/v1/auth`;
    private http = inject(HttpClient)

    login(user: IUser){
      return this.http.post<IAuthCredentials>(`${this.URL_BASE}/login`, user).pipe(first())
    }
}
