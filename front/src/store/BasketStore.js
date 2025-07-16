import {makeAutoObservable} from "mobx";

export default class BasketStore {
    constructor() {
        this._basketLength = 0
        this._basket = {}
        makeAutoObservable(this)
    }

    setLength(len) {
        this._basketLength = len
    }
    setBasket(basket) {
        this._basket = basket
    }

    get getBasketLen() {
        return this._basketLength
    }
    get getBasket() {
        return this._basket
    }
}