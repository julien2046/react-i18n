import en from './en';
import fr from './fr';
import es from './es';

// Split up language code into each part
function getSubtags(languageCode) {
  return languageCode.split('-');
}

// Get the language from the language code
function getLanguage(languageCode) {
  const subtags = getSubtags(languageCode);
  
  return subtags[0];
}

// Return the translations for the language provided
export function getTranslations(languageCode) {
  // Adjust for variations in case for different browsers
  const code = languageCode.toLowerCase();
  
  const language = getLanguage(code);
  
  switch(language) {
    case 'en':
      return en;
    case 'fr':
      return fr;
    case 'es':
      return es;
    default:
      // Default to English
      return en;
  }
}