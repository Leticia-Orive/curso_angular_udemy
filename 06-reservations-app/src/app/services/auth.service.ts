import { Injectable } from '@angular/core';
import { IAuth } from '../models/auth.model';
import { first, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(authCredentials: IAuth){
    let success = false;
    if(authCredentials.email === 'drr@gmail.com' && authCredentials.password === '123456'){
      success = true;
      localStorage.setItem('isLogged', 'true');
    }
    return of(success).pipe(first());
  }
}
