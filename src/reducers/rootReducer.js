import { combineReducers } from "redux";
import { products, searchProducts } from "./products.reducer";
import { cart } from './cart.reducer'
export default combineReducers({
  products,
  searchProducts,
  cart
});
