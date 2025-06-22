const fs = require('fs');
const path = require('path');

// Paths
const srcFile = path.join(__dirname, '../src/index.js');
const destFile = path.join(__dirname, '../dist/index.js');

console.log('Building CommonJS module...');

try {
  // Read the source file
  const source = fs.readFileSync(srcFile, 'utf8');
  
  // Transform to pure CommonJS
  const cjsContent = source
    // Remove ES module export lines
    .replace(/\/\/ ES Module export[\s\S]*?export.*?;/m, '')
    // Replace CommonJS conditional with direct assignment
    .replace(
      /\/\/ For CommonJS environments[\s\S]*?else if.*?}/, 
      `// CommonJS exports
module.exports = {
  cssHash,
  classNames,
  pseudoClasses
};`
    );
  
  // Add strict mode
  const finalContent = `'use strict';

${cjsContent}`;

  // Create dist directory if it doesn't exist
  if (!fs.existsSync(path.dirname(destFile))) {
    fs.mkdirSync(path.dirname(destFile), { recursive: true });
  }

  // Write the transformed file
  fs.writeFileSync(destFile, finalContent, 'utf8');
  console.log(`✅ CommonJS build saved to ${destFile}`);

} catch (err) {
  console.error(`❌ Error building CommonJS module:`, err);
  process.exit(1);
}
