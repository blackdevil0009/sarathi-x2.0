const { TokenType, Keywords } = require('./tokenTypes');

class Lexer {
  constructor(source) {
    this.source = source;
    this.tokens = [];
  }

  tokenize() {
    const lines = this.source.split(/\r?\n/);

    lines.forEach((rawLine, index) => {
      const lineNumber = index + 1;
      const line = rawLine.trim();

      if (!line) {
        return;
      }

      const [keyword, ...restParts] = line.split(/\s+/);
      if (!Keywords.has(keyword)) {
        throw new SyntaxError(`Syntax Error [Line ${lineNumber}]: Unknown keyword "${keyword}".`);
      }

      this.tokens.push({ type: TokenType.KEYWORD, value: keyword, line: lineNumber });

      const rest = restParts.join(' ').trim();
      if (!rest) {
        return;
      }

      let position = 0;
      while (position < rest.length) {
        while (rest[position] === ' ') {
          position += 1;
        }

        if (position >= rest.length) {
          break;
        }

        if (rest[position] === '"') {
          const stringToken = this.readString(rest, position, lineNumber);
          this.tokens.push(stringToken);
          position = stringToken.nextIndex;
          continue;
        }

        const identifierToken = this.readIdentifier(rest, position, lineNumber);
        this.tokens.push(identifierToken);
        position = identifierToken.nextIndex;
      }
    });

    return this.tokens;
  }

  readString(text, start, line) {
    let index = start + 1;
    let value = '';
    while (index < text.length && text[index] !== '"') {
      if (text[index] === '\\' && index + 1 < text.length) {
        value += text[index + 1];
        index += 2;
      } else {
        value += text[index];
        index += 1;
      }
    }

    if (index >= text.length || text[index] !== '"') {
      throw new SyntaxError(`Syntax Error [Line ${line}]: Unterminated string literal.`);
    }

    return {
      type: TokenType.STRING,
      value,
      line,
      nextIndex: index + 1
    };
  }

  readIdentifier(text, start, line) {
    let index = start;
    let value = '';

    while (index < text.length && text[index] !== ' ') {
      value += text[index];
      index += 1;
    }

    if (!/^[A-Za-z_][A-Za-z0-9_-]*$/.test(value)) {
      throw new SyntaxError(`Syntax Error [Line ${line}]: Invalid identifier "${value}".`);
    }

    return {
      type: TokenType.IDENTIFIER,
      value,
      line,
      nextIndex: index
    };
  }
}

module.exports = Lexer;
