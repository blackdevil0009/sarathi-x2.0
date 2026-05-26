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
  'FULL_NAME',
  'EMAIL',
  'PHONE',
  'STUDENT_ID',
  'PASSWORD',
  'CONFIRM_PASSWORD',
  'GENDER',
  'DATE_OF_BIRTH',
  'COURSE',
  'YEAR',
  'TERMS_CHECKBOX',
  'BUTTON',
  'THEME',
  'BACKGROUND'
]);

module.exports = {
  TokenType,
  Keywords
};
