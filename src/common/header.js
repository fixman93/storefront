import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../actions/cart.actions";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import cart from "../assets/images/cart.svg";
import "./header.scss";
class Header extends Component {
  componentDidMount() {
    this.props.dispatch(cartActions.getCart());
  }
  render() {
    return (
      <header>
        <div className='container'>
          <div className='logo'>
            <a href='/'>
              <img src={Logo} alt='Logo' />
            </a>
          </div>
          <nav className='nav'>
            <ul>
              <li>
                <a href='/'>About</a>
              </li>
              <li>
                <a href='/'>Exhibitions</a>
              </li>
              <li>
                <a href='/'>Artists</a>
              </li>
              <li>
                <a href='/'>News</a>
              </li>
              <li>
                <a href='/'>Shop</a>
              </li>
              <li>
                <a href='/'>Discovery</a>
              </li>
              <li>
                <a href='/'>Backroom</a>
              </li>
              <li>
                <a href='/'>Contact</a>
              </li>
            </ul>
          </nav>
          <div className='cart'>
            <Link to='/cart'>
              <img src={cart} alt='Cart' />
              <span>Cart ({this.props.cart && this.props.cart.length})</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  const cart = state.cart && state.cart.items ? state.cart.items : [];
  return {
    cart
  };
}

export default connect(mapStateToProps)(Header);
