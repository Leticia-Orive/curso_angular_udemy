import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { IAuthCredentials } from '../models/auth-credentials';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private afApp = inject(FirebaseApp)
  private auth: Auth = getAuth(this.afApp)

  login(authCredentials: IAuthCredentials){
    return signInWithEmailAndPassword(this.auth, authCredentials.email, authCredentials.password);
  }

}
