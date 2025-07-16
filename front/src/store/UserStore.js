import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}

        const savedAuth = localStorage.getItem('isAuth');
        if (savedAuth) {
            this._isAuth = JSON.parse(savedAuth);
        }

        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            this._user = JSON.parse(savedUser);
        }
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
        localStorage.setItem('isAuth', JSON.stringify(bool));
    }
    setUser(user) {
        this._user = user
        localStorage.setItem('user', JSON.stringify(user));
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}