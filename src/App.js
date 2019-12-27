import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./common/header";
import Footer from "./common/footer/index";
import { Row, Spin } from "antd";

import Articles from "./components/articles";
import { siteActions } from "./actions/product.actions";
import SearchSelect from "./common/search-select";
import "./App.scss";
class App extends Component {
  componentDidMount() {
    this.props.dispatch(siteActions.getAllProducts());
  }

  searchProducts = (value) => {
    this.props.dispatch(siteActions.searchProducts(value));
  };

  render() {
    const { products, loading } = this.props;
    if (!products.products) {
      return (
        <div className='spinner'>
          <Spin />
        </div>
      );
    }
    return (
      <div className='App'>
        {loading ? (
          <div className='spinner'>
            <Spin />
          </div>
        ) : null}
        <Header />
        <SearchSelect sort={true} searchProd={this.searchProducts} />
        <div className='articles'>
          <div className='container'>
            <Row gutter={24}>
              {products && products.products && products.products.length
                ? products.products.map((item) => (
                    <Articles key={item.scheduleId} product={item} />
                  ))
                : null}
            </Row>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const products = state.products ? state.products : [];
  const searchProducts = state.searchProducts ? state.searchProducts : [];
  const loading = state.ajaxStatus ? state.ajaxStatus.loading : [];
  const alert = state.alert ? state.alert : [];
  return {
    products,
    searchProducts,
    loading,
    alert
  };
}

export default connect(mapStateToProps)(App);
