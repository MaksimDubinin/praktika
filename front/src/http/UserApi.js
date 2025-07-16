import {$host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (username, email, password) => {
    const {data} = await $host.post(
        'http://localhost:5000/api/v1/user/registration',
        {username, email, password}
    );

    if (!data.token) {
        throw new Error('Токен не получен от сервера');
    }
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post(
        'http://localhost:5000/api/v1/user/login',
        {email, password}
    );
    if (!data.token) {
        throw new Error('Токен не получен от сервера');
    }
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}