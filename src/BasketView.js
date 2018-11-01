/* eslint react/style-prop-object: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, defineMessages, FormattedMessage, FormattedNumber } from "react-intl";

import Button from "./Button";
import "./BasketView.css";

// Define translations for aria-label text
const messages = defineMessages({
  close: {
    id: "BasketView.close",
    description: "Alternative Text for closing the basket window",
    defaultMessage: "Close",
  }
})

class BasketView extends Component {
  componentDidMount() {
    // Focus the close button
    this.close.focus();
  }

  showBasket() {
    return (
      <table className="BasketView_items">
        <thead>
          <tr>
            <th>
              <FormattedMessage
                id="BasketView.item"
                description="Label for the item in the basket"
                defaultMessage="Item"
              />
            </th>
            <th className="price">
              <FormattedMessage
                id="BasketView.price"
                description="Label for the price of an item in the basket"
                defaultMessage="Price"
              />
            </th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td>
              <FormattedMessage
                id="BasketView.total"
                description="Label for the total value of the basket"
                defaultMessage="Total"
              />
            </td>
            <td className="price">
              <FormattedNumber
                value={this.props.totalCost}
                style="currency"
                currency={this.props.currency}
              />
            </td>
          </tr>
        </tfoot>
        <tbody>
          { this.props.basket.map(item => (
            <tr key={item.id}>
              <td>
                {item.name}
              </td>
              <td className="price">
                <FormattedNumber
                  value={item.price}
                  style="currency"
                  currency={this.props.currency}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render() {
    let basket;

    if(this.props.basket.length > 0) {
      basket = this.showBasket();
    } else {
      basket = <FormattedMessage
        id="BasketView.emptyBasket"
        description="The user has an empty basket"
        defaultMessage="Your basket is empty"
      />
    }

    return (
      <div>
        <div className="BasketView_overlay" onClick={this.props.toggleVisibility}></div>
        <div className="BasketView" role="dialog" aria-labelledby="BasketView_heading">
          <div className="BasketView_container">
            <h2 id="BasketView_heading">
              <FormattedMessage
                id="BasketView.heading"
                description="Heading for the basket view"
                defaultMessage="Basket"
              />
            </h2>
            <Button
              className="BasketView_close"
              ref={(button) => { this.close = button; }}
              onClick={this.props.toggleVisibility}
              aria-label={this.props.intl.formatMessage(messages.close)}
            >
              &#10006;
            </Button>
            { basket }
          </div>
        </div>
      </div>
    );
  }
}

BasketView.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalCost: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  show: PropTypes.bool,
}

BasketView.defaultProps = {
  show: true
}

export default injectIntl(BasketView);
