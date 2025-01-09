import { Injectable } from '@angular/core';
import { IAuth } from '../models/auth.model';
import { BehaviorSubject, first, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*Esto es para que el servicio sea observable
  private subjectAuth = new Subject<boolean>().pipe(
    startWith( ()=> localStorage.getItem('isLogged') == 'true' )
  );*/

  private subjectAuth = new BehaviorSubject<boolean>(localStorage.getItem('isLogged') == 'true')
  /*Es con $ al final, enseguida me doy cuenta de ello*/ 
  public isAutheticated$ = this.subjectAuth.asObservable();

  login(authCredentials: IAuth){
    let success = false;
    if(authCredentials.email === 'drr@gmail.com' && authCredentials.password === '123456'){
      success = true;
      localStorage.setItem('isLogged', 'true');
      /** Estamos logueados o no */
      this.subjectAuth.next(true);
    }
    return of(success).pipe(first());
  }
}
