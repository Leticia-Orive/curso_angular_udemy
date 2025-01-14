import { Signal, signal, WritableSignal } from "@angular/core";
import { IQuantityProduct } from "./quantity-product.model";

export class Order{
    //atributos
    //WritableSignal significa que se puede modificar
    //Signal significa que no se puede modificar

    private _productsSignal: WritableSignal<IQuantityProduct[]> = signal<IQuantityProduct[]>([]);

    public get productsSignal(): Signal<IQuantityProduct[]> {
        return this._productsSignal.asReadonly();
    }
}