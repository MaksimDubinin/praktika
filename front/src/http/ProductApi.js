import {$authHost, $host} from "./index";


export const getProducts = async (type = "all") => {
    const {data} = await $host.get(
        process.env.REACT_APP_API_URL + '/product',
        {
            params: {type}
        }
    );
    console.log(data);
    return data
}