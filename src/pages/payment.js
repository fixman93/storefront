import React, { Component } from "react";
import { connect } from "react-redux";
import { DatePicker } from "antd";
import { cartActions } from "../actions/cart.actions";
import { Row, Col } from "antd";
import { Breadcrumb } from "antd";
import Footer from "../common/footer/index";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";
import PaymentForm from "../components/paymentForm";
import { Elements, StripeProvider } from "react-stripe-elements";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
class Payment extends Component {
  componentDidMount() {
    const { cart_Summary } = this.props;
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
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    // Only show error after a field is touched.
    const cardNumberError =
      isFieldTouched("card_number") && getFieldError("card_number");
    const expirationError =
      isFieldTouched("expiration") && getFieldError("expiration");
    const CVVError = isFieldTouched("CVV") && getFieldError("CVV");
    const BillingError =
      isFieldTouched("Billing_Zip_Code") && getFieldError("Billing_Zip_Code");
    const emailError = isFieldTouched("email") && getFieldError("email");
    let subNumber = 0;
    let sum = 0;
    sum =
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
                  <a href=''>
                    <b>Shopping Cart</b>
                  </a>
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
                {/* <Form
                  onSubmit={this.handleSubmit}
                  ref='form'
                  className='login-form'>
                  <div className='labelTitle'>Payment</div>
                  <Form.Item
                    validateStatus={cardNumberError ? "error" : ""}
                    help={cardNumberError || ""}
                    className='address-search'>
                    {getFieldDecorator("card_number", {
                      rules: [
                        {
                          required: true,
                          message: "*Card Number is mandatory!"
                        }
                      ]
                    })(<Input placeholder='Card Number' />)}
                  </Form.Item>
                  <Form.Item
                    validateStatus={expirationError ? "error" : ""}
                    help={expirationError || ""}
                    className='address-search'>
                    {getFieldDecorator("expiration", {
                      rules: [
                        {
                          required: true,
                          message: "*Expiration date is mandatory!"
                        }
                      ]
                    })(<DatePicker onChange={this.changeDatePicker} />)}
                  </Form.Item>
                  <Form.Item
                    validateStatus={CVVError ? "error" : ""}
                    help={CVVError || ""}
                    className='address-search'>
                    {getFieldDecorator("CVV", {
                      rules: [{ required: true, message: "*CVV is mandatory!" }]
                    })(<Input placeholder='CVV' />)}
                  </Form.Item>
                  <Form.Item
                    validateStatus={BillingError ? "error" : ""}
                    help={BillingError || ""}
                    className='address-search'>
                    {getFieldDecorator("Billing_Zip_Code", {
                      rules: [
                        {
                          required: true,
                          message: "*Billing Zip Code is mandatory!"
                        }
                      ]
                    })(<Input placeholder='Phone Number' />)}
                  </Form.Item>
                  <div className='labelTitle'>Contact</div>
                  <Form.Item
                    validateStatus={emailError ? "error" : ""}
                    help={emailError || ""}
                    className='address-search'>
                    {getFieldDecorator("email", {
                      rules: [
                        { required: true, message: "*Email is mandatory!" }
                      ]
                    })(<Input placeholder='Email' />)}
                  </Form.Item>
                  <div className='modalBottom'>
                    <Button
                      type='primary'
                      htmlType='submit'
                      disabled={hasErrors(getFieldsError())}>
                      Submit
                    </Button>
                  </div>
                </Form> */}
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
