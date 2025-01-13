import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, first } from 'rxjs';
import { IProduct } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatDivider } from '@angular/material/divider';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [AsyncPipe, TranslateModule, MatDivider, MatMiniFabButton, MatIcon, MatButton],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  public product$: Observable<IProduct> = new Observable<IProduct>();
  public quantitySignal: WritableSignal<number> = signal(1);

  ngOnInit(){
    this.activatedRoute.params.pipe(first()).subscribe({
      next: (params: Params) => {
        const productId = params['id'];
        this.product$ = this.productsService.getProduct(productId);
      }
    })
  }

  addProduct(product: IProduct){}

  goBack(){}

  oneLessProduct(){
    this.quantitySignal.update(value => value - 1);
  }
  oneMoreProduct(){
    this.quantitySignal.update(value => value + 1);
  }

}
