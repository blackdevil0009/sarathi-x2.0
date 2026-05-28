const fs = require('fs');
const path = require('path');
const Lexer = require('./compiler/lexer');
const Parser = require('./compiler/parser');
const SemanticAnalyzer = require('./compiler/semanticAnalyzer');
const Generator = require('./compiler/generator');

function compile(source) {
  console.log('Starting Sarthi-X Dashboard Compiler...');

  const lexer = new Lexer(source);
  const tokens = lexer.tokenize();
  console.log('Lexing Complete');

  const parser = new Parser(tokens);
  const ast = parser.parse();
  console.log('Parsing Complete');

  const analyzer = new SemanticAnalyzer();
  analyzer.analyze(ast);
  console.log('Semantic Analysis Complete');

  const generator = new Generator();
  const output = generator.generate(ast);
  console.log('Code Generation Complete');

  return output;
}

function compileFile(inputPath, outputDirectory) {
  const absoluteInput = path.resolve(inputPath);
  const absoluteOutput = path.resolve(outputDirectory);

  if (!fs.existsSync(absoluteInput)) {
    throw new Error(`Input file not found: ${absoluteInput}`);
  }

  const source = fs.readFileSync(absoluteInput, 'utf8');
  const output = compile(source);

  if (!fs.existsSync(absoluteOutput)) {
    fs.mkdirSync(absoluteOutput, { recursive: true });
  }

  fs.writeFileSync(path.join(absoluteOutput, 'dashboard.html'), output.html, 'utf8');
  fs.writeFileSync(path.join(absoluteOutput, 'style.css'), output.css, 'utf8');
  fs.writeFileSync(path.join(absoluteOutput, 'app.js'), output.js, 'utf8');

  console.log('Compilation Successful');
  return {
    html: path.join(absoluteOutput, 'dashboard.html'),
    css: path.join(absoluteOutput, 'style.css'),
    js: path.join(absoluteOutput, 'app.js')
  };
}

if (require.main === module) {
  const inputFile = path.join(__dirname, '..', 'input', 'dashboard.sx');
  const outputFolder = path.join(__dirname, '..', 'output');
  try {
    compileFile(inputFile, outputFolder);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  compile,
  compileFile
};
