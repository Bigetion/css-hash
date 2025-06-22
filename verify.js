// Verify that the library is correctly built and usable
const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Check that dist files exist
console.log('Checking dist files...');
const distDir = path.join(__dirname, 'dist');
const expectedFiles = ['index.js', 'index.mjs', 'index.d.ts'];

for (const file of expectedFiles) {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.error(`❌ ${file} is missing`);
    process.exit(1);
  }
}

// Import the library
console.log('\nTesting library imports...');

// Test CommonJS import
try {
  const cjs = require('./dist/index.js');
  assert(typeof cjs.cssHash === 'function', 'cssHash should be a function');
  assert(typeof cjs.classNames === 'function', 'classNames should be a function');
  assert(typeof cjs.pseudoClasses === 'function', 'pseudoClasses should be a function');
  console.log('✅ CommonJS import works');
} catch (error) {
  console.error('❌ CommonJS import failed', error);
  process.exit(1);
}

// Test functionality
console.log('\nTesting library functionality...');

// Import directly from the dist directory
const lib = require('./dist/index.js');

// Test classNames
try {
  const result = lib.classNames('foo', 'bar', '', null);
  assert.strictEqual(result, 'foo bar', 'classNames should combine valid class names');
  console.log('✅ classNames function works');
} catch (error) {
  console.error('❌ classNames function test failed', error);
  process.exit(1);
}

// Test pseudoClasses
try {
  const result = lib.pseudoClasses(':hover', ['button', 'link']);
  assert.strictEqual(result, ':hoverbutton :hoverlink', 'pseudoClasses should add prefix to class names');
  console.log('✅ pseudoClasses function works');
} catch (error) {
  console.error('❌ pseudoClasses function test failed', error);
  process.exit(1);
}

console.log('\n🎉 All verification tests passed! The library is properly set up and working.');
console.log('You can now publish it to npm using: npm publish');
