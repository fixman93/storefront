import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import message from "antd/es/message";
import "./index.scss";
class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = this.props.stripe.createToken().then(({ token, error }) => {
      if (error) {
        message.error(error.message);
      } else {
        console.log("token", token);
        localStorage.setItem("tokenID", token.id);
      }
    });
  }

  render() {
    console.log("token", this.props);
    return (
      <div className='checkout'>
        <p>Would you like to complete the purchase?</p>
        <CardElement />

        <div className='modalBottom'>
          <button className='ant-btn ant-btn-primary' onClick={this.submit}>
            Save and Continue
          </button>
        </div>
      </div>
    );
  }
}

export default injectStripe(PaymentForm);
