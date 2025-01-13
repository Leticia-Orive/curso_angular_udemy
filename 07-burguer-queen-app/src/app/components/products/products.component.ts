import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first, Observable } from 'rxjs';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private activatedRoute = inject(ActivatedRoute);

  public products$: Observable<IProduct[]> = new Observable<IProduct[]>();

  ngOnInit(){
    this.activatedRoute.params.pipe(first()).subscribe( {
      next: (params: Params) => {
        const categoryId = params['categoryId'];
        //Peticion al servidor


      }
    })

}
}
