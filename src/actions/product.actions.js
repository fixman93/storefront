import { productServices } from "./../services/product.service";

export const productsContants = {
  GET_ALL_PRODUCTS_REQUEST: "GET_ALL_PRODUCTS_REQUEST",
  GET_ALL_PRODUCTS_SUCCESS: "GET_ALL_PRODUCTS_SUCCESS",
  GET_ALL_PRODUCTS_FAILURE: "GET_ALL_PRODUCTS_FAILURE",

  SEARCH_PRODUCTS_SUCCESS: "SEARCH_PRODUCTS_SUCCESS",
  SEARCH_PRODUCTS_FAILURE: "SEARCH_PRODUCTS_FAILURE"
};

export const siteActions = {
  getAllProducts,
  searchProducts
};

function getAllProducts(queryString) {
  return (dispatch) => {
    productServices.getProducts(queryString).then(
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
      type: productsContants.GET_ALL_PRODUCTS_SUCCESS,
      products
    };
  }

  function failure(error) {
    return {
      type: productsContants.GET_ALL_PRODUCTS_FAILURE,
      error
    };
  }
}

function searchProducts(queryString) {
  return (dispatch) => {
    productServices.searchProducts(queryString).then(
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
      type: productsContants.SEARCH_PRODUCTS_SUCCESS,
      products
    };
  }

  function failure(error) {
    return {
      type: productsContants.SEARCH_PRODUCTS_FAILURE,
      error
    };
  }
}
