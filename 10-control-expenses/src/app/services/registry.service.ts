import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {collection, doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { IRegistry } from '../models/registry.model';
import { AuthService } from './auth.service';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  private afApp = inject(FirebaseApp)
  private authService = inject(AuthService)
  private database = getFirestore(this.afApp)

  async createRegistry(registry: IRegistry){
     // Obtiene la colección
    const registryCollection = collection(this.database, 'registries');
    const newRegistryRef = doc(registryCollection)
// Actualizo la referencia del registro
    registry.id = newRegistryRef.id
    registry.user = this.authService.currentUser() as string
    
// Actualizo el registro
    await setDoc(newRegistryRef, registry)
  }

  
}
