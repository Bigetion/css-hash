const fs = require('fs');
const path = require('path');

// Paths
const srcFile = path.join(__dirname, '../src/index.js');
const destFile = path.join(__dirname, '../dist/index.mjs');

console.log('Building ESM module...');

try {
  // Read the source file
  let source = fs.readFileSync(srcFile, 'utf8');
  
  // Clean up the file for ESM
  // Remove CommonJS exports and keep only ES module exports
  const esmContent = source
    // Remove CommonJS conditional exports
    .replace(/\/\/ For CommonJS environments[\s\S]*?else if[\s\S]*?}/, '')
    // Keep only ES module exports
    .trim();
  
  // Create dist directory if it doesn't exist
  if (!fs.existsSync(path.dirname(destFile))) {
    fs.mkdirSync(path.dirname(destFile), { recursive: true });
  }

  // Write the ESM file
  fs.writeFileSync(destFile, esmContent, 'utf8');
  console.log(`✅ ESM build saved to ${destFile}`);

} catch (err) {
  console.error(`❌ Error building ESM module:`, err);
  process.exit(1);
}
