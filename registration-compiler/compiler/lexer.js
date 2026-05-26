const { TokenType, Keywords } = require('./tokenTypes');

class Lexer {
  constructor(source) {
    this.source = source;
    this.tokens = [];
  }

  tokenize() {
    const lines = this.source.split(/\r?\n/);

    lines.forEach((rawLine, index) => {
      const line = rawLine.trim();
      const lineNumber = index + 1;

      if (!line) {
        return;
      }

      const [keyword, ...restParts] = line.split(/\s+/);
      const rest = restParts.join(' ').trim();

      if (!Keywords.has(keyword)) {
        throw new SyntaxError(`Syntax Error [Line ${lineNumber}]: Unknown keyword '${keyword}'.`);
      }

      this.tokens.push({ type: TokenType.KEYWORD, value: keyword, line: lineNumber });

      if (!rest) {
        return;
      }

      if (rest.startsWith('"')) {
        const stringMatch = rest.match(/^"((?:[^"\\]|\\.)*)"$/);
        if (!stringMatch) {
          throw new SyntaxError(`Syntax Error [Line ${lineNumber}]: Unterminated string literal.`);
        }

        const stringValue = stringMatch[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        this.tokens.push({ type: TokenType.STRING, value: stringValue, line: lineNumber });
        return;
      }

      if (/^(true|false)$/i.test(rest)) {
        this.tokens.push({ type: TokenType.BOOLEAN, value: rest.toLowerCase() === 'true', line: lineNumber });
        return;
      }

      if (/^[A-Za-z_][A-Za-z0-9_-]*$/.test(rest)) {
        this.tokens.push({ type: TokenType.IDENTIFIER, value: rest, line: lineNumber });
        return;
      }

      throw new SyntaxError(`Syntax Error [Line ${lineNumber}]: Invalid value after ${keyword}.`);
    });

    return this.tokens;
  }
}

module.exports = Lexer;
