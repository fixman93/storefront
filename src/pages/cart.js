import React, { Component } from "react";
import Header from "../common/header";
import Footer from "../common/footer/index";
import { connect } from "react-redux";
import { cartActions } from "../actions/cart.actions";
import { Row, Col } from "antd";
import { Breadcrumb } from "antd";
import SearchSelect from "../common/search-select";
import { Spin } from "antd";
import CartItems from "../components/cartItems";
import message from "antd/es/message";
import { Link } from "react-router-dom";
import "./index.scss";
class Cart extends Component {
  componentDidMount() {
    this.props.dispatch(cartActions.getCart());
  }

  componentDidUpdate(prevProps) {
    if (this.props.alert !== prevProps.alert) {
      this.showUserMessage();
    }
  }

  showUserMessage() {
    const { alert } = this.props;
    if (alert && alert.type === "alert-success") {
      return message.success(alert.message);
    } else if (alert && alert.type === "alert-danger") {
      return message.error(alert.message);
    }
  }

  render() {
    const { cart, loading } = this.props;

    let subNumber = 0;

    cart &&
      cart.map((item) => {
        return (subNumber = subNumber + item.amount);
      });
    return (
      <div className='cart-page'>
        {loading ? (
          <div className='spinner'>
            <Spin />
          </div>
        ) : null}
        <Header />
        <SearchSelect sort={false} />
        <div className='cartpage'>
          <div className='container'>
            <div className='breadcrumb'>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href='/'>Discover</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <b>Shopping Cart</b>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className='cart-title'>
              <h3>Shoping Cart</h3>
            </div>
            <Row gutter={24}>
              <Col lg={14} md={14} sm={12} xs={24}>
                {cart
                  ? cart.map((item) => (
                      <CartItems
                        key={item.productId}
                        cartItem={item}
                        cart={cart}
                      />
                    ))
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
                    <em>${subNumber && subNumber}</em>
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
  const alert = state.alert ? state.alert : [];
  const loading = state.ajaxStatus ? state.ajaxStatus.loading : [];
  return {
    cart,
    alert,
    loading
  };
}

export default connect(mapStateToProps)(Cart);
