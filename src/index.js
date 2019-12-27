import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Search from "./pages/search";
import Detail from "./pages/detail";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Payment from "./pages/payment";
import "antd/dist/antd.css";
const routing = (
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route exact path='/detail' component={Detail} />
      <Route exact path='/search' component={Search} />
      <Route exact path='/cart' component={Cart} />
      <Route exact path='/checkout' component={Checkout} />
      <Route exact path='/payment' component={Payment} />
    </div>
  </Router>
);

ReactDOM.render(
  <Provider store={configureStore()}>{routing}</Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
