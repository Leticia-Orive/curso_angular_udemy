import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { collection, doc, DocumentData, endBefore, Firestore, getCountFromServer, getDocs, getFirestore,  limit,  limitToLast,  orderBy,  query, QueryConstraint, QueryDocumentSnapshot, QuerySnapshot, setDoc, startAfter, where } from '@angular/fire/firestore';
import { ICategory } from '../models/category.model';
import { AuthService } from './auth.service';
import moment from 'moment';
import { TDirection } from '../types';
import { ITEMS_PAGINATION } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private afApp = inject(FirebaseApp)
  private database: Firestore = getFirestore(this.afApp)
  private authService = inject(AuthService);

  // signals
  public categoriesSignal: WritableSignal<ICategory[]> = signal<ICategory[]>([])
  public totalCategoriesSignal: WritableSignal<number> = signal<number>(0)
  public nextCategoriesSignal: WritableSignal<boolean> = signal<boolean>(false)
  public previousCategoriesSignal: WritableSignal<boolean> = signal<boolean>(false)
 
  // Primer y ultimo documento, para la paginacion
  private firstDocument?: DocumentData;
  private lastDocument?: DocumentData

getCategories(direction: TDirection = null) {
  // Obtenemos la coleccion
  const categoriesCollection = collection(this.database, 'categories');

   // Query base
   const queryConstraints = this.createQuery(direction);
 

  // Creamos la query final
  const queryCategories = query(
    categoriesCollection,
    ...queryConstraints
    
  );

  // Obtenemos las categorias

  return getDocs(queryCategories).then((querySnapshot: QuerySnapshot<DocumentData, DocumentData>) => {
    const categories: ICategory[] = [];
    // recorremos las categorias
    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      const data = doc.data() as ICategory;
      categories.push(data);
    })

    this.categoriesSignal.set(categories);
    this.totalCategories();

    // si estamos paginando actualizamos valores
    if (direction) {
      this.firstDocument = querySnapshot.docs[0];
      this.lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];

      this.nextCategoriesSignal.set(false);
      this.previousCategoriesSignal.set(false);

      this.hasData('next');
      this.hasData('previous');
    }
  });

}
 /**
   * Actualiza los signals relacionados con la paginacion
   * @param direction 
   */

private async hasData(direction: TDirection){
  // Obtenemos la coleccion
  const categoriesCollection = collection(this.database, 'categories');
  // Query base
  const queryHasDataContraints = this.createQuery(direction)

  // Creamos la query
  const queryHasData = query(
    categoriesCollection,
    ...queryHasDataContraints
  );
  // Obtenemos las categorias
  const dataDocs = await getDocs(queryHasData);
  // Obtenemos la longitud
  const hasData = dataDocs.docs.length > 0;

  switch (direction) {
    case 'next':
      this.nextCategoriesSignal.set(hasData);
      break;
    case 'previous':
      this.previousCategoriesSignal.set(hasData);
      break;
  }
}
 /**
   * Crea la query base
   * @param direction 
   * @returns 
   */

 
createQuery(direction: TDirection = null){
  // Obtenemos el usuario actual
  const user = this.authService.currentUser() as string;
  // Creamos la query base
  const queryConstraints: QueryConstraint[] = [
    orderBy('name', 'asc'),
    where("user", "==", user)
  ]

  if(direction){
    switch (direction) {
      case 'next':
        if (this.lastDocument) {
          // Mostrar registros despues del ultimo documento
          queryConstraints.push(startAfter(this.lastDocument))
        }
        // limite
        queryConstraints.push(limit(ITEMS_PAGINATION))
        break;
      case 'previous':
        if (this.firstDocument) {
          // Mostrar registros antes del ultimo documento
          queryConstraints.push(endBefore(this.firstDocument))
        }
        // limite
        queryConstraints.push(limitToLast(ITEMS_PAGINATION))
        break;
    }

  }
  return queryConstraints;
}


  /**
   * Crea una categoria
   * @param category 
   */
  async createCategory(category: ICategory){
   // Obtenemos la coleccion
   const categoriesCollection = collection(this.database, 'categories');
   const newCategoryRef = doc(categoriesCollection)

    // pasamos el id de la nueva referencia
    category.id = newCategoryRef.id;
    category.user = this.authService.currentUser() as string; //aseguro que es un string
    category.createdOn = moment().format('YYYY-MM-DDTHH:mm:ss')

    // crea la categoria
     await setDoc(newCategoryRef, category);
  }

  /**
   * Actualiza una categoria
   * @param category 
   * @returns 
   */
  updateCategory(category: ICategory) {
    // obtenemos la referencia
    const categoryRef = doc(this.database, `categories/${category.id}`)
    // Actualiza la categoria
    return setDoc(categoryRef, category);
  }



/**
   * Obtiene el total de categorias
   */
 async totalCategories(){
    // Obtenemos la coleccion
    const categoriesCollection = collection(this.database, 'categories');
    // query base
    const queryTotal = this.createQuery();

     // creamos la query
    const queryTotalCategories = query(
      categoriesCollection,
      ...queryTotal
    );
    // Con getCountFromServer obtenemos el numero de registros
    const snapshot = await getCountFromServer(queryTotalCategories);
    this.totalCategoriesSignal.set(snapshot.data().count);
  
  }
  /**
   * Resetea los valores
   */
  reset() {
    this.firstDocument = undefined;
    this.lastDocument = undefined;
    this.categoriesSignal.set([])
    this.totalCategoriesSignal.set(0)
    this.nextCategoriesSignal.set(false)
    this.previousCategoriesSignal.set(false)
   
  }

}
