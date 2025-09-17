import {$host} from "./index";


export const registration = async (username, email, password) => {
    try {
        const {data} = await $host.post(
            process.env.REACT_APP_API_URL + '/user/registration',
            {username, email, password},
            {withCredentials: true}
        );
        return data
    } catch (e) {
        console.log(e.message)
    }
}

export const login = async (email, password) => {
    try {
        const {data} = await $host.post(
            process.env.REACT_APP_API_URL + '/user/login',
            {email, password},
            {withCredentials: true}
        );
        return data
    } catch (error) {
        if (error.response) {
            console.error('Данные ошибки:', error.response.data);
            console.error('Статус ошибки:', error.response.status);
            throw new Error(error.response.data.message || 'Ошибка сервера');
        } else if (error.request) {
            console.error('Нет ответа от сервера:', error.request);
            throw new Error('Нет ответа от сервера');
        } else {
            console.error('Ошибка настройки запроса:', error.message);
            throw new Error('Ошибка при отправке запроса');
        }
    }
}
