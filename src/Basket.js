/* eslint react/style-prop-object: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, defineMessages, FormattedNumber } from "react-intl";

import BasketView from "./BasketView";
import Button from "./Button";

// Define translations for aria-label text
const messages = defineMessages({
  basketValue: {
    id: "Basket.basketValue",
    description: "Alternative Text for basket button",
    defaultMessage: "Basket Total {total}",
  }
})

class Basket extends Component {
  constructor() {
    super();

    // Bind add/remove baskets to use this component as context
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.getTotalCost = this.getTotalCost.bind(this);

    this.state = {
      showBasket: false
    }
  }

  // Total the value of the basket
  getTotalCost() {
    return this.props.basket.reduce((acc, item) => acc + item.price, 0);
  }

  // Toggle the visibility of the basket contents
  toggleVisibility() {
    this.setState(prevState => {
      return { showBasket: !prevState.showBasket }
    })
  }

  render() {
    let basketView;
    
    if(this.state.showBasket) {
      basketView = (
        <BasketView
          show={this.state.showBasket}
          basket={this.props.basket}
          currency={this.props.currency}
          totalCost={this.getTotalCost()}
          toggleVisibility={this.toggleVisibility}
        />
      );
    }

    return (
      <div>
        <Button
          onClick={this.toggleVisibility}
          aria-label={this.props.intl.formatMessage(
            messages.basketValue, {
              total: this.props.intl.formatNumber(this.getTotalCost(), {style: "currency", currency: this.props.currency})
            }
          )}>
          <FormattedNumber
            value={this.getTotalCost()}
            style="currency"
            currency={this.props.currency}
          />
        </Button>
        { basketView }
      </div>
    );
  }
}

Basket.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.object).isRequired,
  currency: PropTypes.string.isRequired
}

export default injectIntl(Basket);
