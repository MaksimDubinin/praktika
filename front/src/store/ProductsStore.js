import {makeAutoObservable} from "mobx";

export default class ProductsStore {
    constructor() {
        this._types = []
        this._products = []
        this._selectedType = ""
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setProducts(products) {
        this._products = products
    }

    setSelectedType(type) {
        this._selectedType = type
    }

    get types() {
        return this._types
    }

    get getProducts() {
        return this._products
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }

}