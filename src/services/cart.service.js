import { history } from "../helpers";
import { api } from "../api/api";

export const cartService = {
  getCart,
  updateCart
};

function getCart() {
  return api.getApi_Cart(`/carts`);
}

function updateCart(operations) {
  return api.updateApi_Cart(`/carts`, operations);
}
