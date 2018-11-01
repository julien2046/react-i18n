import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "./Button.css";

class Button extends Component {

  focus() {
    ReactDOM.findDOMNode(this).focus()
  }

  render() {
    return (
      <button
        className={`Button ${this.props.type ? this.props.type : ""} ${this.props.className ? this.props.className : ""}`}
        onClick={this.props.onClick}
        aria-label={this.props["aria-label"]}>
        { this.props.children }
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  "aria-label": PropTypes.string,
}

Button.defaultProps = {
  type: undefined,
  onClick: undefined,
  "aria-label": undefined,
}

export default Button;
