import {$authHost, $host} from "./index";


export const getProducts = async (type = "all") => {
    const {data} = await $host.get(
        process.env.REACT_APP_API_URL + '/product',
        {
            params: {type}
        }
    );
    return data
}

export const getOneProduct = async (id) => {const {data} = await $host.get(
    process.env.REACT_APP_API_URL + `/product/${id}`);
    return data
}

export const sendReview = async (id_product, rating, text, userId) => {
    try {
        const {data} = await $host.post(
            process.env.REACT_APP_API_URL + `/product/${id_product}`,
            {rating, text, userId}
        )
        console.log(data);
        return data
    } catch (error) {
        console.log(error)
    }
}