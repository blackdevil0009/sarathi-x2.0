const TokenType = {
  KEYWORD: 'KEYWORD',
  STRING: 'STRING',
  IDENTIFIER: 'IDENTIFIER'
};

const Keywords = new Set([
  'PAGE',
  'TITLE',
  'WELCOME_MESSAGE',
  'SIDEBAR',
  'MENU',
  'CARDS',
  'CARD',
  'PROFILE_SECTION',
  'PROFILE_NAME',
  'PROFILE_ID',
  'THEME',
  'LAYOUT'
]);

module.exports = {
  TokenType,
  Keywords
};
