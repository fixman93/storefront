import { combineReducers } from "redux";
import { products, searchProducts } from "./products.reducer";
import { alert } from "./alert.reducer";
import ajaxStatus from "./ajaxStatusReducer";
import { cart, shipping_address, cart_Summary } from "./cart.reducer";
export default combineReducers({
  products,
  searchProducts,
  cart,
  alert,
  ajaxStatus,
  shipping_address,
  cart_Summary
});
