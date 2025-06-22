const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Path to examples directory
const examplesDir = path.join(__dirname, 'examples');

// Get all example directories
const examples = fs.readdirSync(examplesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Found ${examples.length} examples to run:\n`);

// Run the Node.js examples
examples.forEach(example => {
  const exampleDir = path.join(examplesDir, example);
  
  // Check if it has an index.js file (Node.js example)
  const indexFile = path.join(exampleDir, 'index.js');
  if (fs.existsSync(indexFile)) {
    console.log(`Running example: ${example}`);
    console.log('-'.repeat(50));
    
    try {
      execSync(`node ${indexFile}`, { stdio: 'inherit' });
      console.log(`✅ Example ${example} completed successfully\n`);
    } catch (error) {
      console.error(`❌ Example ${example} failed:`, error.message);
    }
  } else {
    console.log(`Skipping ${example} - no index.js file found`);
  }
});

console.log('All examples completed!');
