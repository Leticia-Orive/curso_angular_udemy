import { Signal, signal, WritableSignal } from "@angular/core";
import { IQuantityProduct } from "./quantity-product.model";
import { IProduct } from "./product.model";

export class Order{
    //atributos
    //WritableSignal significa que se puede modificar
    //Signal significa que no se puede modificar

    private _productsSignal: WritableSignal<IQuantityProduct[]> = signal<IQuantityProduct[]>([]);

    public get productsSignal(): Signal<IQuantityProduct[]> {
        return this._productsSignal.asReadonly();
    }

    private searchProduct(product: IProduct) : IQuantityProduct | undefined {
        return this._productsSignal().find((productQuantity: IQuantityProduct) => JSON.stringify(product) === JSON.stringify(productQuantity.product));
    }
}