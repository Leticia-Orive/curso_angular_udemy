import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {collection, doc, DocumentData, getDocs, getFirestore, orderBy, query, QueryConstraint, QuerySnapshot, setDoc, where } from '@angular/fire/firestore';
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

  // signals
  public registriesSignal: WritableSignal<IRegistry[]> = signal([]);

  /**
   * Obtiene los registros dado un filtro
   * @param filter 
   * @param direction 
   * @returns 
   */
  getRegistries() {

    // Obtiene la colección
    const registryCollection = collection(this.database, 'registries');

    // Query base
    const queryConstraints = this.createQuery();
    // Crear query
    const queryRegistries = query(
      registryCollection,
      ...queryConstraints
    )
    // Obtiene los registros 
    return getDocs(queryRegistries).then( (querrySnapshotRegistries: QuerySnapshot<DocumentData, DocumentData>) =>{

      const registries: IRegistry[] = [];
      // recorremos los datos
      querrySnapshotRegistries.forEach( (doc) => {
        const data = doc.data() as IRegistry;
        registries.push(data);
      })

      this.registriesSignal.set(registries);
      
      return registries;

    })

    

  }
  /**
   * Crea una query base
   * @param filter 
   * @param direction 
   * @returns 
   */
  private createQuery() {

    // Obtengo el usuario actual
    const user = this.authService.currentUser() as string;

    // query base
    const queryConstraints: QueryConstraint[] = [
      orderBy('date', 'desc'),
      where("user", "==", user)
    ]

    

    return queryConstraints;
  }


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
