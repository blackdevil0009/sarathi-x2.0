const TokenType = {
  KEYWORD: 'KEYWORD',
  STRING: 'STRING',
  BOOLEAN: 'BOOLEAN',
  IDENTIFIER: 'IDENTIFIER'
};

const Keywords = new Set([
  'PAGE',
  'TITLE',
  'SUBTITLE',
  'STUDENT_ID',
  'PASSWORD',
  'BUTTON',
  'REMEMBER_ME',
  'FORGOT_PASSWORD',
  'THEME',
  'BACKGROUND'
]);

module.exports = {
  TokenType,
  Keywords
};
