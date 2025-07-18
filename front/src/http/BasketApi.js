import {$authHost, $host} from "./index";


export const getBasketContent = async (id) => {
    const {data} = await $authHost.get(
        process.env.REACT_APP_API_URL + '/basket', {params: {id}}
    );
    console.log(data);
    return data
}

export const addToBasket = async (id_product, id, quantity = 1) => {
    const {data} = await $authHost.post(
        process.env.REACT_APP_API_URL + '/basket',
        {id_product, id, quantity}
    )
    console.log(data);
    return data
}

export const createOrder = async (id) => {
    const {data} = await $authHost.post(
        process.env.REACT_APP_API_URL + '/order',
        {id}
    )
    console.log(data);
    return data
}

export const getOrders = async (id) => {
    const {data} = await $authHost.get(
        process.env.REACT_APP_API_URL + '/order',
        {
            params: {id}
        }
    )
    if (data.length !== 0) {return data}
    return data
}