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

export function shipping_address(state = {}, action) {
  switch (action.type) {
    case cartConstants.SHIPPING_ADDRESS_SUCCESS:
      return action.shipping_Address;

    case cartConstants.SHIPPING_ADDRESS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}

export function cart_Summary(state = {}, action) {
  switch (action.type) {
    case cartConstants.CART_SUMMARY_SUCCESS:
      return action.summary;

    case cartConstants.CART_SUMMARY_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
