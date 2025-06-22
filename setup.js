// Setup script for npm package
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure we have the src directory
const srcDir = path.join(__dirname, 'src');
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
  console.log('✅ Created src directory');
}

// Copy index.js to src/index.js if needed
const rootIndexPath = path.join(__dirname, 'index.js');
const srcIndexPath = path.join(srcDir, 'index.js');
if (fs.existsSync(rootIndexPath) && !fs.existsSync(srcIndexPath)) {
  fs.copyFileSync(rootIndexPath, srcIndexPath);
  console.log('✅ Copied index.js to src/index.js');
}

// Install dependencies
console.log('🔄 Installing dependencies...');
try {
  execSync('npm install --save-dev @babel/core@7.22.9 @babel/preset-env@7.22.9 babel-jest@29.6.1 jest@29.6.1 jest-environment-jsdom@29.6.1', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies', error);
  process.exit(1);
}

// Build the package
console.log('🔄 Building the package...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Package built successfully');
} catch (error) {
  console.error('❌ Failed to build package', error);
  process.exit(1);
}

// Run tests
console.log('🔄 Running tests...');
try {
  execSync('npm test', { stdio: 'inherit' });
  console.log('✅ Tests completed successfully');
} catch (error) {
  console.error('❌ Tests failed', error);
  process.exit(1);
}

console.log('\n✨ Setup completed successfully! ✨');
console.log('\nNext steps:');
console.log('1. Review the built files in the dist/ directory');
console.log('2. Update README.md if needed');
console.log('3. Publish to npm with npm publish');
