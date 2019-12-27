import { api } from "../api/api";

export const cartService = {
  getCart,
  updateCart,
  shipping_Address,
  cart_Summary
};

function getCart() {
  return api.getApi_Cart(`/carts`);
}

function updateCart(operations) {
  return api.updateApi_Cart(`/carts`, operations);
}

function shipping_Address(data) {
  return api.postApi_Order(`/addressValidation`, data);
}

function cart_Summary() {
  return api.postApi_Cart(`/carts/summary`);
}
