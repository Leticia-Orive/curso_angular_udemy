import { computed, inject, Signal, signal, WritableSignal } from "@angular/core";
import { IQuantityProduct } from "./quantity-product.model";
import { IProduct } from "./product.model";
import { CalculateTotalPricePipe } from "../pipes/calculate-total-price.pipe";

export class Order{
    //atributos
    //WritableSignal significa que se puede modificar
    //Signal significa que no se puede modificar

    private _productsSignal: WritableSignal<IQuantityProduct[]> = signal<IQuantityProduct[]>([]);
    private _numProductsSignal: Signal<number> = computed(() => this.numProducts());
    private _totalOrderSignal: Signal<number> = computed(() => this.totalOrder());
    //Ojo que luego cuando usemos el servicio veremos que puede dar algunos problemas lo vemos mas adelante
    private CalculateTotalPricePipe= inject(CalculateTotalPricePipe);

    public get productsSignal(): Signal<IQuantityProduct[]> {
        return this._productsSignal.asReadonly();
    }
    public get  numProductsSignal(): Signal<number> {
        return this._numProductsSignal;
    }
    public get  totalOrderSignal(): Signal<number> {
        return this._totalOrderSignal;
    }
    

    //Metodo
    public addProduct(product: IProduct, quantity: number = 1){
        const products = this._productsSignal();
        const productFound = this.searchProduct(product);
        if(productFound){
            productFound.quantity += quantity;
        }else{
            products.push({product, quantity});
        }

        //actualizar un array
        // set: setea un nuevo valor de un signal
        this._productsSignal.set([...products]);
    }

    private searchProduct(product: IProduct) : IQuantityProduct | undefined {
        return this._productsSignal().find((productQuantity: IQuantityProduct) => JSON.stringify(product) === JSON.stringify(productQuantity.product));
    }

    private totalOrder(){
        return this._productsSignal().reduce((acum: number, value: IQuantityProduct) => this.CalculateTotalPricePipe.transform(value.product, value.quantity) + acum, 0 );
    }

    //Metodo
    private numProducts(){
        return this._productsSignal().reduce(
            (acum: number, value: IQuantityProduct) => value.quantity + acum, 0);
    }
}