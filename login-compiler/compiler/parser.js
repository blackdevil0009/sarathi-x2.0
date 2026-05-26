const { TokenType } = require('./tokenTypes');
const { NodeType, createNode } = require('./ast');

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.position = 0;
  }

  parse() {
    const ast = [];

    while (!this.isAtEnd()) {
      ast.push(this.parseCommand());
    }

    return ast;
  }

  parseCommand() {
    const keyword = this.consume(TokenType.KEYWORD, 'Expected a keyword token.');
    const command = keyword.value;

    switch (command) {
      case 'PAGE':
        return createNode(NodeType.PAGE_NODE, this.parseIdentifier(command), keyword.line);
      case 'TITLE':
        return createNode(NodeType.TITLE_NODE, this.parseString(command), keyword.line);
      case 'SUBTITLE':
        return createNode(NodeType.SUBTITLE_NODE, this.parseString(command), keyword.line);
      case 'STUDENT_ID':
        this.ensureNoExtraArgument(keyword.line, 'STUDENT_ID');
        return createNode(NodeType.STUDENT_ID_NODE, true, keyword.line);
      case 'PASSWORD':
        this.ensureNoExtraArgument(keyword.line, 'PASSWORD');
        return createNode(NodeType.PASSWORD_NODE, true, keyword.line);
      case 'BUTTON':
        return createNode(NodeType.BUTTON_NODE, this.parseString(command), keyword.line);
      case 'REMEMBER_ME':
        return createNode(NodeType.REMEMBER_ME_NODE, this.parseBoolean(command), keyword.line);
      case 'FORGOT_PASSWORD':
        return createNode(NodeType.FORGOT_PASSWORD_NODE, this.parseBoolean(command), keyword.line);
      case 'THEME':
        return createNode(NodeType.THEME_NODE, this.parseIdentifier(command), keyword.line);
      case 'BACKGROUND':
        return createNode(NodeType.BACKGROUND_NODE, this.parseIdentifier(command), keyword.line);
      default:
        throw new SyntaxError(`Syntax Error [Line ${keyword.line}]: Unsupported command '${command}'.`);
    }
  }

  parseString(commandName) {
    const token = this.peek();
    if (!token || token.type !== TokenType.STRING) {
      throw new SyntaxError(`Syntax Error [Line ${this.currentLine()}]: Expected STRING after ${commandName}.`);
    }
    this.advance();
    return token.value;
  }

  parseBoolean(commandName) {
    const token = this.peek();
    if (!token || token.type !== TokenType.BOOLEAN) {
      throw new SyntaxError(`Syntax Error [Line ${this.currentLine()}]: Expected BOOLEAN after ${commandName}.`);
    }
    this.advance();
    return token.value;
  }

  parseIdentifier(commandName) {
    const token = this.peek();
    if (!token || token.type !== TokenType.IDENTIFIER) {
      throw new SyntaxError(`Syntax Error [Line ${this.currentLine()}]: Expected IDENTIFIER after ${commandName}.`);
    }
    this.advance();
    return token.value;
  }

  ensureNoExtraArgument(line, commandName) {
    const next = this.peek();
    if (next && next.line === line) {
      throw new SyntaxError(`Syntax Error [Line ${line}]: Command ${commandName} does not accept any arguments.`);
    }
  }

  consume(expectedType, errorMessage) {
    if (this.isAtEnd()) {
      throw new SyntaxError(`Syntax Error: ${errorMessage}`);
    }
    const token = this.tokens[this.position];
    if (token.type !== expectedType) {
      throw new SyntaxError(`Syntax Error [Line ${token.line}]: ${errorMessage}`);
    }
    this.position += 1;
    return token;
  }

  peek() {
    return this.tokens[this.position];
  }

  advance() {
    if (!this.isAtEnd()) this.position += 1;
    return this.previous();
  }

  previous() {
    return this.tokens[this.position - 1];
  }

  currentLine() {
    const token = this.peek() || this.previous();
    return token ? token.line : 0;
  }

  isAtEnd() {
    return this.position >= this.tokens.length;
  }
}

module.exports = Parser;
