const fs = require('fs');
const glob = require('glob');

// Start building an ES2015 export
let output = 'export default ';

// Contain all translations
let translations = {};

// Fetch all generated translations
const filenames = glob.sync('./extracted-translations/**/*.json');

// Loop through each translation file
filenames.forEach(function(filename) {
  // Read the JSON
  const file = fs.readFileSync(filename, 'utf8');
  const json = JSON.parse(file);

  // Loop through each translation
  json.forEach(function(translation) {
    // Print to console
    console.log('Found', translation.id);
    // Add translation to export
    translations[translation.id] = translation.description;
  });
});

// Build export
output = output + JSON.stringify(translations, null, '\t');

// Write export
fs.writeFileSync('./src/translations/template.js', output, 'utf-8');