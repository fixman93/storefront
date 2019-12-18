import { cartConstants } from "../actions/cart.actions";

export function cart(state = {}, action) {
  switch (action.type) {
    // Get Relay Locks
    case cartConstants.GET_ALL_CART_SUCCESS:
      return action.products;

    case cartConstants.GET_ALL_CART_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
