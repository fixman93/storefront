import React, { Component } from "react";
import article from "../../assets/images/article.png";
import { Button } from "antd";

import "./index.scss";
class CartItem extends Component {
  getInitialState = () => {
    return { quantity: 1 };
  };

  state = {
    quantity: 1
  };

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
    return (
      <div className='cart-item'>
        <div className='photo'>
          <img src={article} alt='Photo' />
        </div>
        <div className='info'>
          <h2>Vans Sk8 Hi Neckface</h2>
          <h3>Beautiful Losers </h3>
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
        <div className='price'>$120.00</div>
      </div>
    );
  }
}

export default CartItem;
