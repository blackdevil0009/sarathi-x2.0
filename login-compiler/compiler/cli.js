const path = require('path');
const { compileFile } = require('./compiler');

const args = process.argv.slice(2);
const inputPath = args[0] || path.join(__dirname, '..', 'input', 'login.sx');
const outputPath = args[1] || path.join(__dirname, '..', 'output', 'index.html');

try {
  const outFile = compileFile(inputPath, outputPath);
  console.log(`Compiled ${inputPath} -> ${outFile}`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
