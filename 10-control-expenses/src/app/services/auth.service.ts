import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { IAuthCredentials } from '../models/auth-credentials';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private afApp = inject(FirebaseApp)
  private auth: Auth = getAuth(this.afApp)

   /**
   * Nos loguea en firebase
   * @param authCredentials 
   * @returns 
   */
  login(authCredentials: IAuthCredentials){
    return signInWithEmailAndPassword(this.auth, authCredentials.email, authCredentials.password);
  }

   /**
   * Crea una cuenta en firebase
   * @param authCredentials 
   * @returns 
   */
   createAccount(authCredentials: IAuthCredentials){
    return createUserWithEmailAndPassword(this.auth, authCredentials.email, authCredentials.password).then( () => this.login(authCredentials))
  }

}
