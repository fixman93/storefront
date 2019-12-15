import React, { Component } from "react";
import Header from "../common/header";
import { connect } from "react-redux";
import Footer from "../common/footer/index";
import { siteActions } from "../actions/product.actions";
import { Row, Col, Breadcrumb, Button } from "antd";
import article from "../assets/images/article.png";
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

  constructor(props) {
    super(props);
    this.state = {
      productID: null
    };
  }
  render() {
    const { products } = this.props;
    const { productID } = this.state;

    let detailProduct =
      products && products.filter((key) => key.id == productID);
    console.log("PRODUCTS", detailProduct);
    return (
      <div className='detail-page'>
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
                    <li>Color: Black</li>
                    <li>Size: 13</li>
                    <li>Width: Medium</li>
                  </ul>
                  <Button>ADD TO CART</Button>
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
  return {
    products
  };
}

export default connect(mapStateToProps)(Detail);
