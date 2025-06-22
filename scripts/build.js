const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Paths
const distDir = path.join(__dirname, '../dist');

// Clean dist directory
console.log('Cleaning dist directory...');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });
console.log('✅ Dist directory cleaned');

// Build steps
const buildSteps = [
  { script: 'build-cjs.js', name: 'CommonJS build' },
  { script: 'build-esm.js', name: 'ESM build' },
  { script: 'build-types.js', name: 'TypeScript definitions' }
];

// Execute each build step
buildSteps.forEach(step => {
  console.log(`\n🔄 Running ${step.name}...`);
  try {
    execSync(`node ${path.join(__dirname, step.script)}`, { stdio: 'inherit' });
    console.log(`✅ ${step.name} completed successfully`);
  } catch (error) {
    console.error(`❌ ${step.name} failed`, error);
    process.exit(1);
  }
});

console.log('\n🎉 Build completed successfully!');
