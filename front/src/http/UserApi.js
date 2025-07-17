import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (username, email, password) => {
    const {data} = await $host.post(
        process.env.REACT_APP_API_URL + '/user/registration',
        {username, email, password}
    );

    if (!data.token) {
        throw new Error('Токен не получен от сервера');
    }
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    console.log(process.env.REACT_APP_API_URL);
    const {data} = await $host.post(
        process.env.REACT_APP_API_URL + '/user/login',
        {email, password}
    );
    if (!data.token) {
        throw new Error('Токен не получен от сервера');
    }
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}


export const check = async () => {
    const {data} = await $authHost.get(process.env.REACT_APP_API_URL + '/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}