const { TokenType } = require('./tokenTypes');
const { NodeType, createNode } = require('./ast');

const BLOCK_HEADERS = new Set(['SIDEBAR', 'CARDS', 'PROFILE_SECTION']);

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
        return createNode(NodeType.PAGE_NODE, { value: this.parseIdentifier(command), line: keyword.line });
      case 'TITLE':
        return createNode(NodeType.TITLE_NODE, { value: this.parseString(command), line: keyword.line });
      case 'WELCOME_MESSAGE':
        return createNode(NodeType.WELCOME_MESSAGE_NODE, { value: this.parseString(command), line: keyword.line });
      case 'SIDEBAR':
        return createNode(NodeType.SIDEBAR_NODE, { items: this.parseSidebarBlock(), line: keyword.line });
      case 'MENU':
        return createNode(NodeType.MENU_NODE, { value: this.parseString(command), line: keyword.line });
      case 'CARDS':
        return createNode(NodeType.CARDS_NODE, { items: this.parseCardsBlock(), line: keyword.line });
      case 'CARD': {
        const title = this.parseString(command);
        const value = this.parseString(command);
        return createNode(NodeType.CARD_NODE, { title, value, line: keyword.line });
      }
      case 'PROFILE_SECTION':
        return createNode(NodeType.PROFILE_SECTION_NODE, { items: this.parseProfileSectionBlock(), line: keyword.line });
      case 'PROFILE_NAME':
        return createNode(NodeType.PROFILE_NAME_NODE, { value: this.parseString(command), line: keyword.line });
      case 'PROFILE_ID':
        return createNode(NodeType.PROFILE_ID_NODE, { value: this.parseString(command), line: keyword.line });
      case 'THEME':
        return createNode(NodeType.THEME_NODE, { value: this.parseIdentifier(command), line: keyword.line });
      case 'LAYOUT':
        return createNode(NodeType.LAYOUT_NODE, { value: this.parseIdentifier(command), line: keyword.line });
      default:
        throw new SyntaxError(`Syntax Error [Line ${keyword.line}]: Unsupported command '${command}'.`);
    }
  }

  parseSidebarBlock() {
    const items = [];
    while (!this.isAtEnd() && !this.isBlockHeader(this.peek())) {
      const token = this.peek();
      if (token.type !== TokenType.KEYWORD || token.value !== 'MENU') {
        break;
      }
      items.push(this.parseCommand());
    }
    return items;
  }

  parseCardsBlock() {
    const items = [];
    while (!this.isAtEnd() && !this.isBlockHeader(this.peek())) {
      const token = this.peek();
      if (token.type !== TokenType.KEYWORD || token.value !== 'CARD') {
        break;
      }
      items.push(this.parseCommand());
    }
    return items;
  }

  parseProfileSectionBlock() {
    const items = [];
    while (!this.isAtEnd() && !this.isBlockHeader(this.peek())) {
      const token = this.peek();
      if (token.type !== TokenType.KEYWORD || !['PROFILE_NAME', 'PROFILE_ID'].includes(token.value)) {
        break;
      }
      items.push(this.parseCommand());
    }
    return items;
  }

  parseString(commandName) {
    const token = this.peek();
    if (!token || token.type !== TokenType.STRING) {
      throw new SyntaxError(`Syntax Error [Line ${this.currentLine()}]: Expected STRING after ${commandName}.`);
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

  isBlockHeader(token) {
    return token.type === TokenType.KEYWORD && BLOCK_HEADERS.has(token.value);
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
    if (!this.isAtEnd()) {
      this.position += 1;
    }
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
