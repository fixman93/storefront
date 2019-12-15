import React, { Component } from "react";
import Header from "../common/header";
import Footer from "../common/footer/index";
import { Row, Col } from "antd";
import { Breadcrumb, Button } from "antd";
import Search_Select from "../common/search-select";
import CartItems from "../components/cartItems";
import { Link } from "react-router-dom";
import "./index.scss";
class Cart extends Component {
  render() {
    return (
      <div className='cart-page'>
        <Header />
        <Search_Select sort={false} />
        <div className='cartpage'>
          <div className='container'>
            <div className='breadcrumb'>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href=''>Discover</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href=''>
                    <b>Shopping Cart</b>
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className='cart-title'>
              <h3>Shoping Cart</h3>
            </div>
            <Row gutter={24}>
              <Col lg={14} md={14} sm={12} xs={24}>
                <CartItems />
                <CartItems />
                <CartItems />
                <CartItems />
              </Col>
              <Col lg={10} md={10} sm={12} xs={24}>
                <div className='checkout-box'>
                  <div className='subtotal'>
                    <span>Subtotal(4 items)</span>
                    <em>$260.00</em>
                  </div>
                  <Link to='/' className='continue-shopping'>
                    Continue Shopping
                  </Link>
                  <Link to='/checkout' className='checkout'>
                    Checkout
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Cart;
