import { history } from "../helpers";
import { api } from "../api/api";
import { authHeader } from "../helpers/auth-header";

export const productServices = {
  getProducts,
  searchProducts
};

function getProducts(queryString) {
  return api.getApi(`/products`);
}

function searchProducts(queryString) {
  return api.getApi(`/products?q=${queryString}`);
}
