import { api } from "../api/api";

export const productServices = {
  getProducts,
  searchProducts
};

function getProducts() {
  return api.getApi(`/products`);
}

function searchProducts(queryString) {
  return api.getApi(`/products?q=${queryString}`);
}
