import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { siteActions } from "../../actions/product.actions";
import { cartActions } from "../../actions/cart.actions";
import { Spin } from "antd";
import "./index.scss";
class CartItem extends Component {
  componentDidMount() {
    this.props.dispatch(siteActions.getAllProducts());
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { cartItem } = nextProps;

    this.setState({
      quantity: cartItem.quantity
    });
  }

  getInitialState = () => {
    return { quantity: 1 };
  };

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }

  handleIncrement = (e) => {
    const { cartItem } = this.props;
    this.setState({ quantity: this.state.quantity + 1 });
    let operations = {};
    operations = {
      operations: [
        {
          productId: cartItem.productId,
          variantId: cartItem.variantId,
          quantity: this.state.quantity + 1
        }
      ]
    };
    this.props.dispatch(cartActions.updateCart(operations));
  };

  handleDecrement = (e) => {
    const { cartItem } = this.props;
    if (this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
      let operations = {};
      operations = {
        operations: [
          {
            productId: cartItem.productId,
            variantId: cartItem.variantId,
            quantity: this.state.quantity - 1
          }
        ]
      };
      this.props.dispatch(cartActions.updateCart(operations));
    }
  };
  handleChange = (e) => {
    var value = e.target.value.replace(/[^0-9]/, "");
    value = value == "" ? 1 : value;
    value = parseInt(value);
    this.setState({ quantity: value });
  };

  removeFromCart = () => {
    const { cartItem } = this.props;
    let operations = {};
    operations = {
      operations: [
        {
          productId: cartItem.productId,
          variantId: cartItem.variantId,
          quantity: 0
        }
      ]
    };
    this.props.dispatch(cartActions.updateCart(operations));
  };
  render() {
    const { cartItem, products, loading } = this.props;

    let cartItems =
      products && products.filter((key) => key.id == cartItem.productId);
    return (
      <div className='cart-item'>
        {cartItems && cartItems[0] ? (
          <>
            <div className='photo'>
              {/* {loading ? (
                <div className='small-spinner'>
                  <Spin />
                </div>
              ) : null} */}
              <img src={cartItems[0].imageUrl} alt='Photo' />
            </div>
            <div className='info'>
              <h2>{cartItems[0].title}</h2>
              <h3>{cartItems[0].brandName}</h3>
              <ul>
                <li>Color: Black</li>
                <li>Size: Medium</li>
                <li>Width: Medium</li>
              </ul>
              <div className='delete-increse'>
                <Button className='delete' onClick={this.removeFromCart}>
                  Delete
                </Button>
                <div className='component-quantity-input'>
                  <span onClick={this.handleDecrement}>-</span>
                  <input
                    type='text'
                    value={this.state.quantity}
                    onChange={this.handleChange}
                  />
                  <span onClick={this.handleIncrement}>+</span>
                </div>
              </div>
            </div>
            <div className='price'>${cartItem && cartItem.amount}</div>
          </>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const products = state.products
    ? state.products && state.products.products
    : [];
  const loading = state.ajaxStatus ? state.ajaxStatus.loading : [];
  return {
    products,
    loading
  };
}

export default connect(mapStateToProps)(CartItem);
