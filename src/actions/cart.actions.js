import { cartService } from "./../services/cart.service";

export const cartConstants = {
  GET_ALL_CART_REQUEST: "GET_ALL_CART_REQUEST",
  GET_ALL_CART_SUCCESS: "GET_ALL_CART_SUCCESS",
  GET_ALL_CART_FAILURE: "GET_ALL_CART_FAILURE",

  UPDATE_CART_SUCCESS: "UPDATE_CART_SUCCESS",
  UPDATE_CART_FAILURE: "UPDATE_CART_FAILURE"
};

export const cartActions = {
  getCart,
  updateCart
};

function getCart() {
  return (dispatch) => {
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
    cartService
      .updateCart(operations)
      .then((cart) => {
        dispatch(success(cart));
        dispatch(getCart());
      })
      .catch(function(error) {
        console.log(error.response.data.error);
        dispatch(failure(error.response.data.error));
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
