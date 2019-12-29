import React, { Component } from "react";
import Header from "../common/header";
import { connect } from "react-redux";
import Footer from "../common/footer/index";
import { siteActions } from "../actions/product.actions";
import { cartActions } from "../actions/cart.actions";
import { Row, Col, Breadcrumb, Button } from "antd";
import { Spin } from "antd";

import message from "antd/es/message";
import queryString from "query-string";
import moment from "moment";
import "./index.scss";

class Detail extends Component {
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    this.props.dispatch(siteActions.getAllProducts());
    if (values.productID) {
      this.setState({
        productID: values.productID
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.alert !== prevProps.alert) {
      this.showUserMessage();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      productID: null,
      quantity: 1
    };
    this.showUserMessage = this.showUserMessage.bind(this);
  }

  showUserMessage() {
    const { alert } = this.props;
    if (alert && alert.type === "alert-success") {
      return message.success(alert.message);
    } else if (alert && alert.type === "alert-danger") {
      return message.error(alert.message);
    }
  }

  handleIncrement = (e) => {
    this.setState({ quantity: this.state.quantity + 1 });
  };

  handleDecrement = (e) => {
    if (this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  addToCart = (value) => {
    const { quantity } = this.state;
    let operations = {};
    operations = {
      operations: [
        {
          productId: value.id,
          variantId: value.variants[0].id.toString(),
          quantity: quantity
        }
      ]
    };
    this.props.dispatch(cartActions.updateCart(operations));
  };
  render() {
    const { products, loading } = this.props;
    const { productID } = this.state;

    let detailProduct =
      products && products.filter((key) => key.id === productID);
    return (
      <div className='detail-page'>
        {loading ? (
          <div className='spinner'>
            <Spin />
          </div>
        ) : null}
        <Header />
        {detailProduct && detailProduct.length ? (
          <div className='articles'>
            <div className='container'>
              <div className='breadcrumb'>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <a href='/'>Home</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <b>{detailProduct[0].title}</b>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <Row gutter={24} className='article-detail'>
                <Col lg={15} md={15} sm={12} xs={24}>
                  <div className='photo'>
                    <img src={detailProduct[0].imageUrl} alt='Article' />
                  </div>
                  <div className='description-content'>
                    <p>
                      This is a really long description. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Proin finibus eget
                      massa sit amet pretium. In hac habitasse platea dictumst.
                      Vestibulum nulla velit, pretium non orci a, tempus
                      tincidunt neque. Nullam vitae sem quis velit consequat
                      sollicitudin eget porttitor lorem. -Integer vestibulum
                      commodo diam -Consectetur purus viverra vel -Suspendisse
                      potenti. Vivamus vitae vestibulum nibh. Vestibulum ante
                      ipsum primis in faucibus orci luctus et ultrices posuere
                      cubilia Curae;
                    </p>
                  </div>
                </Col>
                <Col lg={9} md={9} sm={12} xs={24} className='article-info'>
                  <h2>{detailProduct[0].title}</h2>
                  <h3>{detailProduct[0].brandName}</h3>
                  <b>${detailProduct[0].price}</b>
                  <span>
                    Expires:{" "}
                    {moment
                      .parseZone(detailProduct[0].price)
                      .local()
                      .format("DD-MM-YYYY HH:mm")}
                  </span>
                  <ul>
                    <li>
                      {detailProduct[0].options[0]} :{" "}
                      {detailProduct[0].variants &&
                        detailProduct[0].variants[0].title}
                    </li>
                  </ul>
                  <div className='delete-increse detail-increse'>
                    <div className='component-quantity-input'>
                      <span onClick={this.handleDecrement}>-</span>
                      <input
                        type='text'
                        value={this.state.quantity}
                        onChange={() => this.handleChange}
                      />
                      <span onClick={this.handleIncrement}>+</span>
                    </div>
                  </div>
                  <Button onClick={() => this.addToCart(detailProduct[0])}>
                    ADD TO CART
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        ) : null}
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const products = state.products
    ? state.products && state.products.products
    : [];
  const loading = state.ajaxStatus ? state.ajaxStatus.loading : [];
  const alert = state.alert ? state.alert : [];
  return {
    products,
    loading,
    alert
  };
}

export default connect(mapStateToProps)(Detail);
