import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { collection, doc, Firestore, getFirestore, setDoc } from '@angular/fire/firestore';
import { ICategory } from '../models/category.model';
import { AuthService } from './auth.service';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private afApp = inject(FirebaseApp)
  private database: Firestore = getFirestore(this.afApp)
  private authService = inject(AuthService);


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
}
