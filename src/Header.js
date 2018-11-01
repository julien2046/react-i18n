import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, defineMessages } from "react-intl";

import Basket from "./Basket";

import "./Header.css";
import logo from "./logo.svg";

// Define translations for alt text
const messages = defineMessages({
  companyName: {
    id: "Header.companyName",
    description: "Alternative Text for London Tours logo",
    defaultMessage: "London Tours",
  }
})

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <img src={logo} className="Header_logo" alt={this.props.intl.formatMessage(messages.companyName)} />
        <Basket basket={this.props.basket} currency={this.props.currency} />
      </header>
    );
  }
}

Header.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default injectIntl(Header);
