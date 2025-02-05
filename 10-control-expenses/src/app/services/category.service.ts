import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { collection, doc, DocumentData, Firestore, getDocs, getFirestore, query, QueryDocumentSnapshot, QuerySnapshot, setDoc } from '@angular/fire/firestore';
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

  // signals
  public categoriesSignal: WritableSignal<ICategory[]> = signal<ICategory[]>([])
 

getCategories() {
  // Obtenemos la coleccion
  const categoriesCollection = collection(this.database, 'categories');
 

  // Creamos la query final
  const queryCategories = query(
    categoriesCollection,
    
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
      
  });

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
}
