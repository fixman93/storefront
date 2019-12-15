import React, { Component } from "react";
import article from "../../assets/images/article.png";
import { Col } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

class Articles extends Component {
  render() {
    const { product } = this.props;

    return (
      <Col lg={6} md={8} sm={12} xs={24}>
        {product ? (
          <>
            <Link
              to={{
                pathname: "/detail",
                search: `?productID=${product.id}`
              }}>
              <div className='photo'>
                <img src={product.imageUrl} alt='Article' />
              </div>
            </Link>
            <div className='info'>
              <b>${product.price}</b>
              <h3>{product.brandName}</h3>
              <h2>{product.title}</h2>
              <span>
                Expires:{" "}
                {moment
                  .parseZone(product.endDate)
                  .local()
                  .format("DD-MM-YYYY HH:mm")}
              </span>
            </div>
          </>
        ) : null}
      </Col>
    );
  }
}

export default Articles;
