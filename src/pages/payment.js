import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../actions/cart.actions";
import { Row, Col } from "antd";
import { Breadcrumb } from "antd";
import Footer from "../common/footer/index";
import Form from "antd/es/form";
import PaymentForm from "../components/paymentForm";
import { Elements, StripeProvider } from "react-stripe-elements";

class Payment extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    this.props.dispatch(cartActions.cart_Summary());
    this.props.dispatch(cartActions.getCart());
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {});
  };
  render() {
    const { cart } = this.props;

    // Only show error after a field is touched.
    let subNumber = 0;

    cart &&
      cart.map((item) => {
        return (subNumber = subNumber + item.amount);
      });
    return (
      <div className='cart-page'>
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
            <div className='header-top'>
              <Breadcrumb separator='>'>
                <Breadcrumb.Item>Ship Address</Breadcrumb.Item>
                <Breadcrumb.Item>Payment</Breadcrumb.Item>
                <Breadcrumb.Item>Billing Address</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Row gutter={24}>
              <Col lg={14} md={14} sm={12} xs={24}>
                <StripeProvider apiKey='pk_test_ajFCGxNqMmX92QFtS6Ajisaq'>
                  <div className='example'>
                    <h1>Payment</h1>
                    <Elements>
                      <PaymentForm />
                    </Elements>
                  </div>
                </StripeProvider>
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
  const shipping_address = state.shipping_address ? state.shipping_address : [];
  const cart = state.cart && state.cart.items ? state.cart.items : [];
  return {
    shipping_address,
    cart
  };
}
export default Form.create()(connect(mapStateToProps)(Payment));
