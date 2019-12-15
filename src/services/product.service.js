import {
    history
} from '../helpers';
import {
    api
} from '../api/api';
import {
    authHeader
} from "../helpers/auth-header";

export const productServices = {
    getProducts
};



function getProducts(queryString) {
        return api.getApi(`/products`)
}
