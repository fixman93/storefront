import React, { Component } from "react";
import "./index.scss";
class Footer extends Component {
  render() {
    return (
      <footer className='footer'>
        <ul>
          <li>
            <a href='/'>Terms</a>
          </li>
          <li>
            <a href='/'>Privacy Policy</a>
          </li>
        </ul>
        <p>Site and all contents ©2005-2019 Jonathan LeVine Gallery</p>
        <p>
          Powered by <b>DISTLL</b>{" "}
        </p>
      </footer>
    );
  }
}

export default Footer;
