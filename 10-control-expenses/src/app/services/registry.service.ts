import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { collection, doc, DocumentData, endBefore, getDocs, getFirestore, limit, limitToLast, query, QueryConstraint, QuerySnapshot, setDoc, startAfter, where, orderBy } from '@angular/fire/firestore';
import { IRegistry } from '../models/registry.model';
import { AuthService } from './auth.service';
import { TDirection } from '../types';
import { ITEMS_PAGINATION } from '../constants';
import { IFilter } from '../shared/filter/models/filter.model';

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

  getRegistries(filter: IFilter, direction: TDirection = null){

    const registryCollection = collection(this.database, 'registries');

    const queryConstraints = this.createQuery(filter, direction);

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

        this.hasData(filter, 'next');
        this.hasData(filter, 'previous');

      }
      
      return registries;

    })


  }

  private createQuery(filter: IFilter, direction: TDirection = null){

    const user = this.authService.currentUser() as string;

    const queryConstraints: QueryConstraint[] = [
      orderBy('date', 'desc'),
      where("user", "==", user)
    ]

    if(filter.dateStart){
      queryConstraints.push(
        where("date", ">=", filter.dateStart)
      )
    }
    
    if(filter.dateEnd){
      queryConstraints.push(
        where("date", "<=", filter.dateEnd)
      )
    }

    if(filter.category){
      queryConstraints.push(
        where("idCategory", "==", filter.category)
      )
    }

    if(direction){
      switch(direction){
        case 'next':
          if(this.lastDocument){
            queryConstraints.push(startAfter(this.lastDocument))
          }
          queryConstraints.push(limit(ITEMS_PAGINATION))

          break;
        case 'previous':
          if(this.firstDocument){
            queryConstraints.push(endBefore(this.firstDocument))
          }
          queryConstraints.push(limitToLast(ITEMS_PAGINATION))
          break;
      }
    }

    return queryConstraints;
  }

  private async hasData(filter: IFilter, direction: TDirection){

    const registryCollection = collection(this.database, 'registries');
    const queryHasDataContraints = this.createQuery(filter, direction)

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
    this.registriesSignal.set([])
    this.resetPagination();
  }

}
