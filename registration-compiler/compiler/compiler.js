const fs = require('fs');
const path = require('path');
const Lexer = require('./lexer');
const Parser = require('./parser');
const SemanticAnalyzer = require('./semanticAnalyzer');
const Generator = require('./generator');

const inputPath = path.join(__dirname, '..', 'input', 'registration.sx');
const outputDir = path.join(__dirname, '..', 'output');
const outputPath = path.join(outputDir, 'register.html');

function log(message) {
  console.log(message);
}

function compile(sourceText) {
  log('Starting Sarthi-X Registration Compiler...');

  const lexer = new Lexer(sourceText);
  const tokens = lexer.tokenize();
  log('Lexical Analysis Complete');

  const parser = new Parser(tokens);
  const ast = parser.parse();
  log('Parsing Complete');

  const semanticAnalyzer = new SemanticAnalyzer();
  semanticAnalyzer.analyze(ast);
  log('Semantic Analysis Complete');

  const generator = new Generator();
  const htmlOutput = generator.generate(ast);
  log('HTML Generation Complete');

  return htmlOutput;
}

function run() {
  try {
    const sourceText = fs.readFileSync(inputPath, { encoding: 'utf8' });
    const html = compile(sourceText);

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, html, { encoding: 'utf8' });

    log('Compilation Successful');
    log(`Output written to ${outputPath}`);
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(error.message);
    } else {
      console.error(error.message || String(error));
    }
    process.exitCode = 1;
  }
}

if (require.main === module) {
  run();
}

module.exports = {
  compile
};
