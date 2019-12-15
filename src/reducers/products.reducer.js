   import {
    productsContants
  } from '../actions/product.actions';
  
  export function products(state = {}, action) {
    switch (action.type) {
  
      // Get Relay Locks
      case productsContants.GET_ALL_PRODUCTS_SUCCESS:
        return action.products
  
      case productsContants.GET_ALL_PRODUCTS_FAILURE:
        return {
          error: action.error
        }
        default:
          return state
  
    }
  }

  export default products