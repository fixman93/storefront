import { beginAjaxCall } from "./ajaxStatusActions";
import { cartService } from "./../services/cart.service";
import { alertActions } from "./alert.actions";
export const cartConstants = {
  GET_ALL_CART_REQUEST: "GET_ALL_CART_REQUEST",
  GET_ALL_CART_SUCCESS: "GET_ALL_CART_SUCCESS",
  GET_ALL_CART_FAILURE: "GET_ALL_CART_FAILURE",

  UPDATE_CART_REQUEST: "UPDATE_CART_REQUEST",
  UPDATE_CART_SUCCESS: "UPDATE_CART_SUCCESS",
  UPDATE_CART_FAILURE: "UPDATE_CART_FAILURE",

  SHIPPING_ADDRESS_REQUEST: "SHIPPING_ADDRESS_REQUEST",
  SHIPPING_ADDRESS_SUCCESS: "SHIPPING_ADDRESS_SUCCESS",
  SHIPPING_ADDRESS_FAILURE: "SHIPPING_ADDRESS_FAILURE",

  CART_SUMMARY_REQUEST: "CART_SUMMARY_REQUEST",
  CART_SUMMARY_SUCCESS: "CART_SUMMARY_SUCCESS",
  CART_SUMMARY_FAILURE: "CART_SUMMARY_FAILURE"
};

export const cartActions = {
  getCart,
  updateCart,
  shipping_Address,
  cart_Summary
};

function getCart() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    cartService.getCart().then(
      (products) => {
        dispatch(success(products));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function success(products) {
    return {
      type: cartConstants.GET_ALL_CART_SUCCESS,
      products
    };
  }

  function failure(error) {
    return {
      type: cartConstants.GET_ALL_CART_FAILURE,
      error
    };
  }
}

function updateCart(operations) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    cartService
      .updateCart(operations)
      .then((cart) => {
        dispatch(success(cart));
        dispatch(getCart());
        dispatch(alertActions.success("Cart Updated"));
      })
      .catch(function(error) {
        dispatch(failure(error.response.data.error));
        dispatch(alertActions.error("Please check your cart"));
      });
  };

  function success(cart) {
    return {
      type: cartConstants.UPDATE_CART_SUCCESS,
      cart
    };
  }

  function failure(error) {
    return {
      type: cartConstants.UPDATE_CART_FAILURE,
      error
    };
  }
}

function shipping_Address(data) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    cartService
      .shipping_Address(data)
      .then((shipping_Address) => {
        dispatch(success(shipping_Address));
        dispatch(getCart());
        dispatch(alertActions.success("Cart Updated"));
      })
      .catch(function(error) {
        dispatch(failure(error));
        dispatch(alertActions.error("Please check your cart"));
      });
  };

  function success(shipping_Address) {
    return {
      type: cartConstants.SHIPPING_ADDRESS_SUCCESS,
      shipping_Address
    };
  }

  function failure(error) {
    return {
      type: cartConstants.SHIPPING_ADDRESS_FAILURE,
      error
    };
  }
}

function cart_Summary() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    cartService
      .cart_Summary()
      .then((summary) => {
        dispatch(success(summary));
        // dispatch(alertActions.success("Cart Updated"));
      })
      .catch(function(error) {
        dispatch(failure(error));
        // dispatch(alertActions.error("Please check your cart"));
      });
  };

  function success(summary) {
    return {
      type: cartConstants.CART_SUMMARY_SUCCESS,
      summary
    };
  }

  function failure(error) {
    return {
      type: cartConstants.CART_SUMMARY_FAILURE,
      error
    };
  }
}
