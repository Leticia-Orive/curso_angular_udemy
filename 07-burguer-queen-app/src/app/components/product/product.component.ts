import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, first } from 'rxjs';
import { IProduct } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  public product$: Observable<IProduct> = new Observable<IProduct>();

  ngOnInit(){
    this.activatedRoute.params.pipe(first()).subscribe({
      next: (params: Params) => {
        const productId = params['id'];
        this.product$ = this.productsService.getProduct(productId);
      }
    })
  }

}
