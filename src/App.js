import React, { Component } from "react";
// Import React-Intl
import { injectIntl, defineMessages } from "react-intl";

import Header from "./Header";
import Products from "./Products";
import Product from "./Product";
import Footer from "./Footer";
import "./App.css";

// Define translations for this component
const messages = defineMessages({
  appTitle: {
    id: "App.title", // Unique ID for this phrase
    description: "Title for the application", // Description used to help translators
    defaultMessage: "Welcome to London Tours", // What to display if a translation cannot be found
  },
  riverTour: {
    id: "Products.riverTour.name",
    description: "Name of the River Tour product",
    defaultMessage: "River Tour",
  },
  riverTourDescription: {
    id: "Products.riverTour.description",
    description: "Description of the River Tour product",
    defaultMessage: "See the capital from a unique perspective",
  },
  busTour: {
    id: "Products.busTour.name",
    description: "Name of the Bus Tour product",
    defaultMessage: "Bus Tour",
  },
  busTourDescription: {
    id: "Products.busTour.description",
    description: "Description of the Bus Tour product",
    defaultMessage: "Discover everything the city has to offer with an all day pass",
  },
  shard: {
    id: "Products.shard.name",
    description: "Name of the Shard product",
    defaultMessage: "Night in the Shard",
  },
  shardDescription: {
    id: "Products.shard.description",
    description: "Description of the Shard product",
    defaultMessage: "Reach new heights and see London sparkle",
  },
  londonEye: {
    id: "Products.londonEye.name",
    description: "Name of the London Eye product",
    defaultMessage: "Private Trip on the London Eye",
  },
  londonEyeDescription: {
    id: "Products.londonEye.description",
    description: "Description of the London Eye product",
    defaultMessage: "Scan the London skyline in your own personal capsule",
  },
  museumHopper: {
    id: "Products.museumHopper.name",
    description: "Name of the Museum Hopper product",
    defaultMessage: "Must-see Museum Hopper",
  },
  museumHopperDescription: {
    id: "Products.museumHopper.description",
    description: "Description of the Museum Hopper product",
    defaultMessage: "Take in the culture at London's top attractions",
  },
  londonByNight: {
    id: "Products.londonByNight.name",
    description: "Name of the London By Night product",
    defaultMessage: "London By Night",
  },
  londonByNightDescription: {
    id: "Products.londonByNight.description",
    description: "Description of the London By Night product",
    defaultMessage: "Find a different side to the capital at night with its many bars and nightclubs",
  },
});

class App extends Component {
  constructor(props) {
    super();

    // Bind add/remove baskets to use this component as context
    this.addToBasket = this.addToBasket.bind(this);
    this.removeFromBasket = this.removeFromBasket.bind(this);

    // Currency used within the app
    this.currency = "GBP";

    // Products available
    // Provide translations for name and descriptions
    this.productList = [
      {
        id: 1,
        name: props.intl.formatMessage(messages.riverTour),
        description: props.intl.formatMessage(messages.riverTourDescription),
        date: new Date(2017,6,28,9,0,0),
        price: 24,
        image: "/photos/river-tour.jpg"
      },
      {
        id: 2,
        name: props.intl.formatMessage(messages.busTour),
        description: props.intl.formatMessage(messages.busTourDescription),
        date: new Date(2017,6,28,9,0,0),
        price: 12,
        image: "/photos/bus-tour.jpg"
      },
      {
        id: 3,
        name: props.intl.formatMessage(messages.shard),
        description: props.intl.formatMessage(messages.shardDescription),
        date: new Date(2017,6,28,18,0,0),
        price: 15.99,
        image: "/photos/night-in-the-shard.jpg"
      },
      {
        id: 4,
        name: props.intl.formatMessage(messages.londonEye),
        description: props.intl.formatMessage(messages.londonEyeDescription),
        date: new Date(2017,6,28,12,0,0),
        price: 400,
        image: "/photos/london-eye.jpg"
      },
      {
        id: 5,
        name: props.intl.formatMessage(messages.museumHopper),
        description: props.intl.formatMessage(messages.museumHopperDescription),
        date: new Date(2017,6,29,9,0,0),
        price: 19.99,
        image: "/photos/museum-hopper.jpg"
      },
      {
        id: 6,
        name: props.intl.formatMessage(messages.londonByNight),
        description: props.intl.formatMessage(messages.londonByNightDescription),
        date: new Date(2017,6,29,21,0,0),
        price: 14.99,
        image: "/photos/london-by-night.jpg"
      }
    ];
    // Hold the state of the basket at the top level
    this.state = {
      basket: []
    }
  }

  componentDidMount() {
    // Translate the title of the application
    document.title = this.props.intl.formatMessage(messages.appTitle);
  }

  addToBasket(id) {
    // Find product in basket
    const product = this.productList.find(product => product.id === id);

    if (product) {
      this.setState(prevState => {
        return {
          basket: [...prevState.basket, product]
        }
      })
    }
  }

  removeFromBasket(id) {
    // Remove the product and set the state
    this.setState(prevState => {
      return {
        basket: prevState.basket.filter(item => item.id !== id)
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Header basket={this.state.basket} currency={this.currency} />

        <Products>
          {Object.keys(this.productList).map(index => {
            const product = this.productList[index];
            return (
              <Product
                key={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                currency={this.currency}
                price={product.price}
                date={product.date}
                addToBasket={() => this.addToBasket(product.id)}
                removeFromBasket={() => this.removeFromBasket(product.id)}
                inBasket={this.state.basket.filter(item => item.id === product.id).length > 0}
              />
            )
          })}
        </Products>

        <Footer />
      </div>
    );
  }
}

export default injectIntl(App);
