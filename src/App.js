import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./common/header";
import Footer from "./common/footer/index";
import { Row } from "antd";

import Articles from "./components/articles";
import { siteActions } from "./actions/product.actions";
import Search_Select from "./common/search-select";
import "./App.scss";
class App extends Component {
  componentDidMount() {
    this.props.dispatch(siteActions.getAllProducts());
  }

  render() {
    const { products } = this.props;
    return (
      <div className='App'>
        <Header />
        <Search_Select sort={true} />
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
  return {
    products
  };
}

export default connect(mapStateToProps)(App);
