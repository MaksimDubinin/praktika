import {makeAutoObservable} from "mobx";

export default class ProductsStore {
    constructor() {
        this._products = []
        makeAutoObservable(this)
    }
    setProducts(products) {
        this._products = products
    }

    get getProducts() {
        return this._products
    }

}