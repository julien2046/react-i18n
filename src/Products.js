import React, { Component } from "react";

import "./Products.css";

class Products extends Component {
  render() {
    return (
      <main className="Products">
        { this.props.children }
      </main>
    );
  }
}

export default Products;