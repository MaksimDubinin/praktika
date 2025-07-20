import {$authHost, $host} from "./index";


export const getBasketContent = async (id) => {
    const {data} = await $authHost.get(
        process.env.REACT_APP_API_URL + '/basket', {params: {id}}
    );
    return data
}

export const addToBasket = async (id_product, id, quantity = 1) => {
    const {data} = await $authHost.post(
        process.env.REACT_APP_API_URL + '/basket',
        {id_product, id, quantity}
    )
    return data
}

export const deleteFromBasket = async (id_product ,id) => {
    try {
        const {data} = await $authHost.post(
            process.env.REACT_APP_API_URL + '/basket/delete',
            {id_product, id}
        )
        return data
    } catch (e) {
        console.log(e)
    }
}

export const createOrder = async (id) => {
    try {
        const {data} = await $authHost.post(
            process.env.REACT_APP_API_URL + '/order',
            {id}
        )
        return data
    } catch (error) {
        console.log(error)
    }
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

export const getAllOrder = async () => {
    const {data} = await $authHost.get(
        process.env.REACT_APP_API_URL + '/order/admin'
    )
    return data
}