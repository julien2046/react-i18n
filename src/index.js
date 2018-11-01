import React from "react";
import ReactDOM from "react-dom";
// Import React-Intl...
import { IntlProvider, addLocaleData } from "react-intl";

// ...and import the related i18n content for the supported locales
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";

// Import function to fetch translations
import { getTranslations } from "./translations/";

import App from "./App";
import "./index.css";




// Add locale data to React-Intl process
addLocaleData([...en, ...fr, ...es]);


// Define supported languages for the application
const supportedLanguages = ["en", "en-gb", "fr", "es"];


// Find the language to use for the application from various browser implementations
let language = "en";
if (navigator.languages) {

  for(let i = 0; i < navigator.languages.length; i++) {
    const lang = navigator.languages[i].toLowerCase();

    if (supportedLanguages.includes(lang)) {
      language = lang;
      break;
    }
  }
} else if (navigator.language) {
  language = navigator.language.toLowerCase();
}

// Get messages for language
const messages = getTranslations(language);


// Render the application
ReactDOM.render(
  <IntlProvider locale={language} messages={messages}>
    <App />
  </IntlProvider>, document.getElementById("root")
);
