import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { collection, doc, DocumentData, endBefore, getDocs, getFirestore, limit, limitToLast, query, QueryConstraint, QuerySnapshot, setDoc, startAfter, where,orderBy } from '@angular/fire/firestore';
import { IRegistry } from '../models/registry.model';
import { AuthService } from './auth.service';
import moment from 'moment';

import { TDirection } from '../types';
import { ITEMS_PAGINATION } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  private afApp = inject(FirebaseApp)
  private authService = inject(AuthService)
  private database = getFirestore(this.afApp)

  public registriesSignal: WritableSignal<IRegistry[]> = signal([]);
  public nextRegistriesSignal: WritableSignal<boolean> = signal(false);
  public previousRegistriesSignal: WritableSignal<boolean> = signal(false);

  private firstDocument?: DocumentData;
  private lastDocument?: DocumentData;

  getRegistries(direction: TDirection = null){

    const registryCollection = collection(this.database, 'registries');

    const queryConstraints = this.createQuery(direction);

    const queryRegistries = query(
      registryCollection,
      ...queryConstraints
    )

    return getDocs(queryRegistries).then( (querrySnapshotRegistries: QuerySnapshot<DocumentData, DocumentData>) =>{

      const registries: IRegistry[] = [];

      querrySnapshotRegistries.forEach( (doc) => {
        const data = doc.data() as IRegistry;
        registries.push(data);
      })

      this.registriesSignal.set(registries);

      if(direction){

        this.firstDocument = querrySnapshotRegistries.docs[0]
        this.lastDocument = querrySnapshotRegistries.docs[querrySnapshotRegistries.docs.length - 1];

        this.hasData('next');
        this.hasData('previous');

      }
      
      return registries;

    })


  }

  private createQuery(direction: TDirection = null){

    const user = this.authService.currentUser() as string;

    const queryConstraints: QueryConstraint[] = [
      orderBy('date', 'desc'),
      where("user", "==", user)
    ]

    if(direction){
      switch(direction){
        case 'next':
          queryConstraints.push(limit(ITEMS_PAGINATION))
          if(this.lastDocument){
            queryConstraints.push(startAfter(this.lastDocument))
          }

          break;
        case 'previous':
          queryConstraints.push(limitToLast(ITEMS_PAGINATION))
          if(this.firstDocument){
            queryConstraints.push(endBefore(this.firstDocument))
          }
          break;
      }
    }

    return queryConstraints;
  }

  private async hasData(direction: TDirection){

    const registryCollection = collection(this.database, 'registries');
    const queryHasDataContraints = this.createQuery(direction)

    const queryHasData = query(
      registryCollection,
      ...queryHasDataContraints
    )

    const dataDocs = await getDocs(queryHasData);
    const hasData = dataDocs.docs.length > 0;

    switch(direction){
      case 'next':
        this.nextRegistriesSignal.set(hasData)
        break;
      case 'previous':
        this.previousRegistriesSignal.set(hasData)
        break;
    }

  }

  async createRegistry(registry: IRegistry){

    const registryCollection = collection(this.database, 'registries');
    const newRegistryRef = doc(registryCollection)

    registry.id = newRegistryRef.id
    registry.user = this.authService.currentUser() as string

    await setDoc(newRegistryRef, registry)

  }
  resetPagination(){
    this.nextRegistriesSignal.set(false);
    this.previousRegistriesSignal.set(false);
    this.firstDocument = undefined;
    this.lastDocument = undefined;
  }
  reset(){
    this.registriesSignal.set([]);
    this.resetPagination();
  }

}
