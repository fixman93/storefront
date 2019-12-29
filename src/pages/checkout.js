import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../actions/cart.actions";
import { Row, Col } from "antd";
import { Breadcrumb } from "antd";
import Footer from "../common/footer/index";
import Form from "antd/es/form";
import Input from "antd/es/input";
import message from "antd/es/message";
import Button from "antd/es/button";
import { Spin } from "antd";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
class Checkout extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    this.props.dispatch(cartActions.getCart());
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.shipping_address.isInputAddressValidated !==
      prevProps.shipping_address.isInputAddressValidated
    ) {
      this.setState({
        validForm: this.props.shipping_address.isInputAddressValidated
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      test: false,
      validForm: null
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const shipping_address = {
        zip: values.zip,
        address2: values.address2,
        city: values.city,
        address1: values.address1,
        state: values.state
      };
      localStorage.setItem(
        "shipping_address",
        JSON.stringify(shipping_address)
      );
      this.props.dispatch(cartActions.shipping_Address(shipping_address));
    });
  };

  redirectToPayment = () => {
    this.props.history.push("/payment");
  };

  showAlertMessage = () => {
    message.error("Please check your address");
  };
  render() {
    if (this.props.shipping_address.isInputAddressValidated) {
      this.redirectToPayment();
    }
    console.log("eeeee", this.state.validForm);
    const { cart, loading } = this.props;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    // Only show error after a field is touched.
    const cityError = isFieldTouched("city") && getFieldError("city");
    const address1Error =
      isFieldTouched("address1") && getFieldError("address1");
    const address2Error =
      isFieldTouched("sddress2") && getFieldError("address2");
    const stateError = isFieldTouched("zip") && getFieldError("zip");
    const zipError = isFieldTouched("zip") && getFieldError("zip");

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
                <Breadcrumb.Item className='active ant-breadcrumb-link'>
                  Ship Address
                </Breadcrumb.Item>
                <Breadcrumb.Item>Payment</Breadcrumb.Item>
                <Breadcrumb.Item>Billing Address</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Row gutter={24}>
              <Col lg={14} md={14} sm={12} xs={24}>
                <Form
                  onSubmit={this.handleSubmit}
                  ref='form'
                  className='login-form'>
                  <div className='labelTitle'>Shipping Address</div>
                  <Form.Item
                    validateStatus={cityError ? "error" : ""}
                    help={cityError || ""}
                    className='address-search'>
                    {getFieldDecorator("city", {
                      rules: [
                        {
                          required: true,
                          message: "*City is mandatory!"
                        }
                      ]
                    })(<Input placeholder='City' />)}
                  </Form.Item>
                  <Form.Item
                    validateStatus={address1Error ? "error" : ""}
                    help={address1Error || ""}
                    className='address-search'>
                    {getFieldDecorator("address1", {
                      rules: [
                        { required: true, message: "*Address is mandatory!" }
                      ]
                    })(<Input placeholder='Address' />)}
                  </Form.Item>
                  <Form.Item
                    validateStatus={address2Error ? "error" : ""}
                    help={address2Error || ""}
                    className='address-search'>
                    {getFieldDecorator("address2", {
                      rules: [
                        {
                          required: true,
                          message: "*Address is mandatory!"
                        }
                      ]
                    })(<Input placeholder='Address' />)}
                  </Form.Item>
                  <Form.Item
                    validateStatus={stateError ? "error" : ""}
                    help={stateError || ""}
                    className='address-search'>
                    {getFieldDecorator("state", {
                      rules: [
                        {
                          required: true,
                          message: "*State is mandatory!"
                        }
                      ]
                    })(<Input placeholder='State' />)}
                  </Form.Item>
                  <Form.Item
                    validateStatus={zipError ? "error" : ""}
                    help={zipError || ""}
                    className='address-search'>
                    {getFieldDecorator("zip", {
                      rules: [
                        {
                          required: true,
                          message: "*Zip is mandatory!"
                        }
                      ]
                    })(<Input placeholder='Zip' />)}
                  </Form.Item>
                  {this.state.validForm === false ? (
                    <span className='form-error'>Please check your form</span>
                  ) : null}
                  <div className='modalBottom'>
                    <Button
                      type='primary'
                      htmlType='submit'
                      disabled={hasErrors(getFieldsError())}>
                      Save and Continue
                    </Button>
                  </div>
                </Form>
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
  const loading = state.ajaxStatus ? state.ajaxStatus.loading : [];
  return {
    shipping_address,
    cart,
    loading
  };
}

const withRouterr = compose(withRouter, connect(mapStateToProps))(Checkout);
export default Form.create()(withRouterr);
