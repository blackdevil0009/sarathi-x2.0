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
      case 'FULL_NAME':
        this.ensureNoExtraArgument(keyword.line, 'FULL_NAME');
        return createNode(NodeType.FULL_NAME_NODE, true, keyword.line);
      case 'EMAIL':
        this.ensureNoExtraArgument(keyword.line, 'EMAIL');
        return createNode(NodeType.EMAIL_NODE, true, keyword.line);
      case 'PHONE':
        this.ensureNoExtraArgument(keyword.line, 'PHONE');
        return createNode(NodeType.PHONE_NODE, true, keyword.line);
      case 'STUDENT_ID':
        this.ensureNoExtraArgument(keyword.line, 'STUDENT_ID');
        return createNode(NodeType.STUDENT_ID_NODE, true, keyword.line);
      case 'PASSWORD':
        this.ensureNoExtraArgument(keyword.line, 'PASSWORD');
        return createNode(NodeType.PASSWORD_NODE, true, keyword.line);
      case 'CONFIRM_PASSWORD':
        this.ensureNoExtraArgument(keyword.line, 'CONFIRM_PASSWORD');
        return createNode(NodeType.CONFIRM_PASSWORD_NODE, true, keyword.line);
      case 'GENDER':
        this.ensureNoExtraArgument(keyword.line, 'GENDER');
        return createNode(NodeType.GENDER_NODE, true, keyword.line);
      case 'DATE_OF_BIRTH':
        this.ensureNoExtraArgument(keyword.line, 'DATE_OF_BIRTH');
        return createNode(NodeType.DATE_OF_BIRTH_NODE, true, keyword.line);
      case 'COURSE':
        this.ensureNoExtraArgument(keyword.line, 'COURSE');
        return createNode(NodeType.COURSE_NODE, true, keyword.line);
      case 'YEAR':
        this.ensureNoExtraArgument(keyword.line, 'YEAR');
        return createNode(NodeType.YEAR_NODE, true, keyword.line);
      case 'TERMS_CHECKBOX':
        return createNode(NodeType.TERMS_CHECKBOX_NODE, this.parseBoolean(command), keyword.line);
      case 'BUTTON':
        return createNode(NodeType.BUTTON_NODE, this.parseString(command), keyword.line);
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
