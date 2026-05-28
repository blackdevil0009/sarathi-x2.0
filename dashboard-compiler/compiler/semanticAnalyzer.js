const { NodeType } = require('./ast');

class SemanticAnalyzer {
  analyze(ast) {
    const state = {
      hasPage: false,
      hasTitle: false,
      hasProfileName: false,
      hasProfileId: false
    };

    ast.forEach((node) => {
      switch (node.type) {
        case NodeType.PAGE_NODE:
          if (state.hasPage) {
            throw new Error(`Semantic Error [Line ${node.line}]: Duplicate PAGE definition.`);
          }
          state.hasPage = true;
          break;
        case NodeType.TITLE_NODE:
          if (state.hasTitle) {
            throw new Error(`Semantic Error [Line ${node.line}]: Duplicate TITLE definition.`);
          }
          state.hasTitle = true;
          break;
        case NodeType.MENU_NODE:
          throw new Error(`Semantic Error [Line ${node.line}]: MENU must be defined inside a SIDEBAR block.`);
        case NodeType.CARD_NODE:
          throw new Error(`Semantic Error [Line ${node.line}]: CARD must be defined inside a CARDS block.`);
        case NodeType.PROFILE_NAME_NODE:
          throw new Error(`Semantic Error [Line ${node.line}]: PROFILE_NAME must be defined inside PROFILE_SECTION.`);
        case NodeType.PROFILE_ID_NODE:
          throw new Error(`Semantic Error [Line ${node.line}]: PROFILE_ID must be defined inside PROFILE_SECTION.`);
        case NodeType.SIDEBAR_NODE:
          this.validateSidebar(node);
          break;
        case NodeType.CARDS_NODE:
          this.validateCards(node);
          break;
        case NodeType.PROFILE_SECTION_NODE:
          this.validateProfileSection(node);
          break;
        case NodeType.THEME_NODE:
          this.validateTheme(node);
          break;
        case NodeType.LAYOUT_NODE:
          this.validateLayout(node);
          break;
        default:
          break;
      }
    });

    if (!state.hasPage) {
      throw new Error('Semantic Error: PAGE is required.');
    }

    if (!state.hasTitle) {
      throw new Error('Semantic Error: TITLE is required.');
    }

    return true;
  }

  validateSidebar(node) {
    if (!Array.isArray(node.items) || node.items.length === 0) {
      throw new Error(`Semantic Error [Line ${node.line}]: SIDEBAR block must contain at least one MENU item.`);
    }

    node.items.forEach((item) => {
      if (item.type !== NodeType.MENU_NODE) {
        throw new Error(`Semantic Error [Line ${item.line}]: Only MENU entries are allowed inside SIDEBAR.`);
      }
    });
  }

  validateCards(node) {
    if (!Array.isArray(node.items) || node.items.length === 0) {
      throw new Error(`Semantic Error [Line ${node.line}]: CARDS block must contain at least one CARD.`);
    }

    node.items.forEach((item) => {
      if (item.type !== NodeType.CARD_NODE) {
        throw new Error(`Semantic Error [Line ${item.line}]: Only CARD entries are allowed inside CARDS.`);
      }
      if (!item.title || !item.value) {
        throw new Error(`Semantic Error [Line ${item.line}]: CARD requires a title and a value.`);
      }
    });
  }

  validateProfileSection(node) {
    if (!Array.isArray(node.items) || node.items.length === 0) {
      throw new Error(`Semantic Error [Line ${node.line}]: PROFILE_SECTION must contain PROFILE_NAME and PROFILE_ID.`);
    }

    let nameCount = 0;
    let idCount = 0;

    node.items.forEach((item) => {
      if (item.type === NodeType.PROFILE_NAME_NODE) {
        nameCount += 1;
      } else if (item.type === NodeType.PROFILE_ID_NODE) {
        idCount += 1;
      } else {
        throw new Error(`Semantic Error [Line ${item.line}]: Only PROFILE_NAME and PROFILE_ID are allowed inside PROFILE_SECTION.`);
      }
    });

    if (nameCount !== 1 || idCount !== 1) {
      throw new Error(`Semantic Error [Line ${node.line}]: PROFILE_SECTION must contain exactly one PROFILE_NAME and one PROFILE_ID.`);
    }
  }

  validateTheme(node) {
    const allowed = ['dark', 'light'];
    if (!allowed.includes(node.value.toLowerCase())) {
      throw new Error(`Semantic Error [Line ${node.line}]: THEME must be dark or light.`);
    }
  }

  validateLayout(node) {
    const allowed = ['modern', 'classic'];
    if (!allowed.includes(node.value.toLowerCase())) {
      throw new Error(`Semantic Error [Line ${node.line}]: LAYOUT must be modern or classic.`);
    }
  }
}

module.exports = SemanticAnalyzer;
