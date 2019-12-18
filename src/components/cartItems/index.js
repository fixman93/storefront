import React, { Component } from "react";
import { connect } from "react-redux";
import article from "../../assets/images/article.png";
import { Button } from "antd";
import { siteActions } from "../../actions/product.actions";
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
    this.setState({ quantity: this.state.quantity + 1 });
  };

  handleDecrement = (e) => {
    if (this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };
  handleChange = (e) => {
    var value = e.target.value.replace(/[^0-9]/, "");
    value = value == "" ? 1 : value;
    value = parseInt(value);
    this.setState({ quantity: value });
  };
  render() {
    const { cartItem, products } = this.props;
    let cartItems =
      products && products.filter((key) => key.id == cartItem.productId);
    return (
      <div className='cart-item'>
        {cartItems && cartItems[0] ? (
          <>
            <div className='photo'>
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
                <Button className='delete'>Delete</Button>
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
            <div className='price'>${cartItems[0].price}</div>
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
  return {
    products
  };
}

export default connect(mapStateToProps)(CartItem);
