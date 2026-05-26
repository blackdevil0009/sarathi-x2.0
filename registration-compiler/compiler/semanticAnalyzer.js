const { NodeType } = require('./ast');

class SemanticAnalyzer {
  analyze(ast) {
    const seen = {
      PAGE: false,
      TITLE: false,
      BUTTON: false,
      PASSWORD: false,
      CONFIRM_PASSWORD: false,
      FULL_NAME: false,
      EMAIL: false,
      STUDENT_ID: false,
      TERMS_CHECKBOX: false
    };

    if (!ast.length) {
      throw new Error('Semantic Error: The input program is empty.');
    }

    if (ast[0].type !== NodeType.PAGE_NODE) {
      throw new Error(`Semantic Error [Line ${ast[0].line}]: PAGE must be the first command.`);
    }

    const indexes = {
      TITLE: -1,
      SUBTITLE: -1,
      FULL_NAME: -1,
      EMAIL: -1,
      STUDENT_ID: -1,
      PASSWORD: -1,
      CONFIRM_PASSWORD: -1,
      TERMS_CHECKBOX: -1,
      BUTTON: -1
    };

    ast.forEach((node, index) => {
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
          indexes.TITLE = index;
          break;
        case NodeType.BUTTON_NODE:
          if (seen.BUTTON) {
            throw new Error(`Semantic Error [Line ${node.line}]: Duplicate BUTTON command detected.`);
          }
          seen.BUTTON = true;
          indexes.BUTTON = index;
          break;
        case NodeType.FULL_NAME_NODE:
          seen.FULL_NAME = true;
          indexes.FULL_NAME = index;
          break;
        case NodeType.EMAIL_NODE:
          seen.EMAIL = true;
          indexes.EMAIL = index;
          break;
        case NodeType.STUDENT_ID_NODE:
          seen.STUDENT_ID = true;
          indexes.STUDENT_ID = index;
          break;
        case NodeType.PASSWORD_NODE:
          seen.PASSWORD = true;
          indexes.PASSWORD = index;
          break;
        case NodeType.CONFIRM_PASSWORD_NODE:
          seen.CONFIRM_PASSWORD = true;
          indexes.CONFIRM_PASSWORD = index;
          break;
        case NodeType.TERMS_CHECKBOX_NODE:
          seen.TERMS_CHECKBOX = true;
          indexes.TERMS_CHECKBOX = index;
          break;
        case NodeType.SUBTITLE_NODE:
          indexes.SUBTITLE = index;
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
    if (!seen.FULL_NAME) {
      throw new Error('Semantic Error: FULL_NAME command missing.');
    }
    if (!seen.EMAIL) {
      throw new Error('Semantic Error: EMAIL command missing.');
    }
    if (!seen.STUDENT_ID) {
      throw new Error('Semantic Error: STUDENT_ID command missing.');
    }
    if (!seen.PASSWORD) {
      throw new Error('Semantic Error: PASSWORD command missing.');
    }
    if (!seen.CONFIRM_PASSWORD) {
      throw new Error('Semantic Error: CONFIRM_PASSWORD command missing.');
    }
    if (!seen.TERMS_CHECKBOX) {
      throw new Error('Semantic Error: TERMS_CHECKBOX command missing.');
    }

    if (indexes.TITLE !== -1 && indexes.SUBTITLE !== -1 && indexes.SUBTITLE < indexes.TITLE) {
      throw new Error('Semantic Error: SUBTITLE must appear after TITLE.');
    }

    if (indexes.PASSWORD !== -1 && indexes.CONFIRM_PASSWORD !== -1 && indexes.CONFIRM_PASSWORD < indexes.PASSWORD) {
      throw new Error('Semantic Error: CONFIRM_PASSWORD must appear after PASSWORD.');
    }

    if (indexes.BUTTON !== -1 && indexes.TERMS_CHECKBOX !== -1 && indexes.BUTTON < indexes.TERMS_CHECKBOX) {
      throw new Error('Semantic Error: BUTTON must appear after TERMS_CHECKBOX.');
    }

    return true;
  }
}

module.exports = SemanticAnalyzer;
