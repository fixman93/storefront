import React, { Component } from "react";
import Header from "../common/header";
import { connect } from "react-redux";

import Footer from "../common/footer/index";
import { siteActions } from "../actions/product.actions";
import { Row, Spin, Breadcrumb } from "antd";
import article from "../assets/images/article.png";
import queryString from "query-string";
import Articles from "../components/articles";
import "./index.scss";
class Search extends Component {
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    this.props.dispatch(siteActions.searchProducts(values.q));
    if (values.q) {
      this.setState({
        searchString: values.q
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      searchString: ""
    };
  }
  render() {
    const { searchProducts } = this.props;
    if (!searchProducts.products) {
      return (
        <div className='spinner'>
          <Spin />
        </div>
      );
    }
    return (
      <div className='search-page'>
        <Header />
        <div className='articles'>
          <div className='container'>
            <div className='breadcrumb'>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href='/'>Home</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <b>{this.state.searchString}</b>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className='search-result'>
              <span>
                Search results (
                {searchProducts && searchProducts.continuationToken ? (
                  searchProducts.continuationToken
                ) : (
                  <span>0</span>
                )}
                )
              </span>
            </div>
            <Row gutter={24}>
              {searchProducts &&
              searchProducts.products &&
              searchProducts.products.length ? (
                searchProducts.products.map((item) => (
                  <Articles key={item.scheduleId} product={item} />
                ))
              ) : (
                <div className='empty-search'>
                  <p>No search results found.</p>
                </div>
              )}
            </Row>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const searchProducts = state.searchProducts ? state.searchProducts : [];
  return {
    searchProducts
  };
}

export default connect(mapStateToProps)(Search);
