const { NodeType } = require('./ast');

class SemanticAnalyzer {
  analyze(ast) {
    const seen = {
      PAGE: false,
      TITLE: false,
      BUTTON: false,
      STUDENT_ID: false,
      PASSWORD: false,
      REMEMBER_ME: false,
      FORGOT_PASSWORD: false
    };

    if (!ast.length) {
      throw new Error('Semantic Error: The input program is empty.');
    }

    if (ast[0].type !== NodeType.PAGE_NODE) {
      throw new Error(`Semantic Error [Line ${ast[0].line}]: PAGE must be the first command.`);
    }

    ast.forEach((node) => {
      switch (node.type) {
        case NodeType.PAGE_NODE:
          if (seen.PAGE) {
            throw new Error(`Semantic Error [Line ${node.line}]: Duplicate PAGE command detected.`);
          }
          seen.PAGE = true;
          break;
        case NodeType.TITLE_NODE:
          if (seen.TITLE) {
            throw new Error(`Semantic Error [Line ${node.line}]: Duplicate TITLE command detected.`);
          }
          seen.TITLE = true;
          break;
        case NodeType.BUTTON_NODE:
          if (seen.BUTTON) {
            throw new Error(`Semantic Error [Line ${node.line}]: Duplicate BUTTON command detected.`);
          }
          seen.BUTTON = true;
          break;
        case NodeType.STUDENT_ID_NODE:
          if (seen.STUDENT_ID) {
            throw new Error(`Semantic Error [Line ${node.line}]: Duplicate STUDENT_ID command detected.`);
          }
          seen.STUDENT_ID = true;
          break;
        case NodeType.PASSWORD_NODE:
          if (seen.PASSWORD) {
            throw new Error(`Semantic Error [Line ${node.line}]: Duplicate PASSWORD command detected.`);
          }
          seen.PASSWORD = true;
          break;
        case NodeType.REMEMBER_ME_NODE:
          if (seen.REMEMBER_ME) {
            throw new Error(`Semantic Error [Line ${node.line}]: Duplicate REMEMBER_ME command detected.`);
          }
          seen.REMEMBER_ME = true;
          break;
        case NodeType.FORGOT_PASSWORD_NODE:
          if (seen.FORGOT_PASSWORD) {
            throw new Error(`Semantic Error [Line ${node.line}]: Duplicate FORGOT_PASSWORD command detected.`);
          }
          seen.FORGOT_PASSWORD = true;
          break;
        default:
          break;
      }
    });

    if (!seen.PAGE) {
      throw new Error('Semantic Error: PAGE command missing.');
    }

    if (!seen.BUTTON) {
      throw new Error('Semantic Error: BUTTON command missing.');
    }

    if (!seen.STUDENT_ID) {
      throw new Error('Semantic Error: STUDENT_ID command missing.');
    }

    if (!seen.PASSWORD) {
      throw new Error('Semantic Error: PASSWORD command missing.');
    }

    return true;
  }
}

module.exports = SemanticAnalyzer;
