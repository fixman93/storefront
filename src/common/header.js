import React, { Component } from "react";
import Logo from "../assets/images/logo.svg";
import cart from "../assets/images/cart.svg";
import "./header.scss";
class Header extends Component {
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
            <img src={cart} alt='Cart' />
            <span>Cart (0)</span>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
