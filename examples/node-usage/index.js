// Example of using css-hash in a Node.js environment
const { classNames, pseudoClasses } = require('../../dist/index.js');

// Using classNames function
const buttonClasses = classNames('btn', 'btn-primary', 'btn-large');
console.log('Button classes:', buttonClasses);
// Output: Button classes: btn btn-primary btn-large

// Using pseudoClasses function
const hoverClasses = pseudoClasses(':hover', ['button', 'link']);
console.log('Hover classes:', hoverClasses);
// Output: Hover classes: :hoverbutton :hoverlink

// Note: cssHash function requires a browser environment with a document object
console.log('Note: cssHash function is designed for browser environments');

console.log('\nExample completed successfully!');
