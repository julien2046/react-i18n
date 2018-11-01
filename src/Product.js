/* eslint react/style-prop-object: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
// Import React-Intl
import { injectIntl, defineMessages, FormattedMessage, FormattedNumber, FormattedDate } from "react-intl";


import Button from "./Button";
import "./Product.css";

// Define translations for aria-label text
const messages = defineMessages({
  addItemToBasket: {
    id: "Product.addItemToBasket",
    description: "Label text for adding a named item to the basket",
    defaultMessage: "Add {item} to Basket",
  },
  removeItemFromBasket: {
    id: "Product.removeItemFromBasket",
    description: "Label text for removing a named item from the basket",
    defaultMessage: "Remove {item} from Basket",
  }
})


class Product extends Component {
  render() {
    const styles = {
      backgroundImage: `url(${this.props.image})`
    }

    let basketButton;

    if(this.props.inBasket) {
      /* Provide aria-label for the button's function */
      basketButton = (
        <Button
          onClick={this.props.removeFromBasket}
          aria-label={this.props.intl.formatMessage(
            messages.removeItemFromBasket, {
              item: this.props.name
            }
          )}>
            <FormattedMessage
              id="Product.removeFromBasket"
              description="Button for removing a product from a basket"
              defaultMessage="Remove from Basket"
            />
        </Button>
      );
    } else {
      /* Provide aria-label for the button's function */
      basketButton = (
        <Button
          type="primary"
          onClick={this.props.addToBasket}
          aria-label={this.props.intl.formatMessage(
            messages.addItemToBasket, {
              item: this.props.name
            }
          )}
          >
          <FormattedMessage
            id="Product.addToBasket"
            description="Button for adding a product to a basket"
            defaultMessage="Add to Basket"
          />
        </Button>
      );
    }

    return (
        <section className="Product">
            <div className="Product_image" style={styles}></div>
            <div className="Product_info">
              <h2>{this.props.name}</h2>
              <p>{this.props.description}</p>
              <div className="date">
                <FormattedDate
                  value={this.props.date}
                  hour12={true}
                  weekday="short"
                  year="numeric"
                  month="long"
                  day="2-digit"
                  hour="numeric"
                  minute="numeric"
                />
              </div>
              <span className="price">
                <FormattedNumber
                  value={this.props.price}
                  style="currency"
                  currency={this.props.currency}
                />
              </span>

              <div className="Product_actions">
                { basketButton }
              </div>
            </div>
        </section>
    );
  }
}

Product.PropTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  addToBasket: PropTypes.func.isRequired,
  removeFromBasket: PropTypes.func.isRequired,
  inBasket: PropTypes.bool
}

Product.defaultProps = {
  name: undefined,
  description: undefined,
  date: new Date(),
  price: 0,
  inBasket: false,
}

export default injectIntl(Product);
