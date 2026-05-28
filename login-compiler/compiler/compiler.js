const fs = require('fs');
const path = require('path');
const Lexer = require('./lexer');
const Parser = require('./parser');
const SemanticAnalyzer = require('./semanticAnalyzer');
const Generator = require('./generator');

function compile(source) {
  const lexer = new Lexer(source);
  const tokens = lexer.tokenize();

  const parser = new Parser(tokens);
  const ast = parser.parse();

  const analyzer = new SemanticAnalyzer();
  analyzer.analyze(ast);

  const generator = new Generator();
  return generator.generate(ast);
}

function compileFile(inputPath, outputPath) {
  const absoluteInput = path.resolve(inputPath);
  const absoluteOutput = path.resolve(outputPath);
  const source = fs.readFileSync(absoluteInput, 'utf8');
  const html = compile(source);
  fs.writeFileSync(absoluteOutput, html, 'utf8');
  return absoluteOutput;
}

module.exports = {
  compile,
  compileFile
};
