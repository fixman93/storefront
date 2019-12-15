import React, { Component } from "react";
import Header from "../common/header";
import Footer from "../common/footer/index";
import { Row, Col, Breadcrumb } from "antd";
import article from "../assets/images/article.png";

import "./index.scss";
class Search extends Component {
  render() {
    return (
      <div className='search-page'>
        <Header />
        <div className='articles'>
          <div className='container'>
            <div className='breadcrumb'>
              <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href=''>
                    <b>"Floral"</b>
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className='search-result'>
              <span>Search results (1)</span>
            </div>
            <Row gutter={24}>
              <Col lg={6} md={8} sm={12} xs={24}>
                <div className='photo'>
                  <img src={article} alt='Article' />
                </div>
                <div className='info'>
                  <b>$420.00</b>
                  <h3>Beautiful Losers</h3>
                  <h2>Vans Sk8 Hi Neckface</h2>
                  <span>Expires: 12/14/19 11:59 PST</span>
                </div>
              </Col>
            </Row>
            <div className='empty-search'>
              <p>No search results found.</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Search;
