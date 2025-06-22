// Example of using css-hash in a Node.js environment
const { classNames, clearCssCache } = require('../../dist/index.js');

// Using classNames function
const buttonClasses = classNames('btn', 'btn-primary', 'btn-large');
console.log('Button classes:', buttonClasses);
// Output: Button classes: btn btn-primary btn-large

// Using classNames with conditional classes
const conditionalClasses = classNames('btn', { 'btn-active': true, 'btn-disabled': false });
console.log('Conditional classes:', conditionalClasses);
// Output: Conditional classes: btn btn-active

// Note: cssHash function requires a browser environment with a document object
console.log('Note: cssHash function is designed for browser environments');

console.log('\nExample completed successfully!');
