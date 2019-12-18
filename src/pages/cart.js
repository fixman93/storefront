import React, { Component } from "react";
import Header from "../common/header";
import Footer from "../common/footer/index";
import { connect } from "react-redux";
import { cartActions } from "../actions/cart.actions";
import { Row, Col } from "antd";
import { Breadcrumb, Button } from "antd";
import Search_Select from "../common/search-select";
import CartItems from "../components/cartItems";
import { Link } from "react-router-dom";
import "./index.scss";
class Cart extends Component {
  componentDidMount() {
    this.props.dispatch(cartActions.getCart());
  }
  render() {
    const { cart } = this.props;
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
                {cart
                  ? cart.map((item) => <CartItems cartItem={item} />)
                  : null}
              </Col>
              <Col lg={10} md={10} sm={12} xs={24}>
                <div className='checkout-box'>
                  <div className='subtotal'>
                    <span>
                      Subtotal(
                      {this.props.cart && this.props.cart.length <= 1 ? (
                        <span>{this.props.cart.length} item</span>
                      ) : (
                        <span>{this.props.cart.length} items</span>
                      )}
                      )
                    </span>
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

function mapStateToProps(state) {
  const cart = state.cart && state.cart.items ? state.cart.items : [];
  return {
    cart
  };
}

export default connect(mapStateToProps)(Cart);
