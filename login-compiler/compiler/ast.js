const NodeType = {
  PAGE_NODE: 'PAGE_NODE',
  TITLE_NODE: 'TITLE_NODE',
  SUBTITLE_NODE: 'SUBTITLE_NODE',
  STUDENT_ID_NODE: 'STUDENT_ID_NODE',
  PASSWORD_NODE: 'PASSWORD_NODE',
  BUTTON_NODE: 'BUTTON_NODE',
  REMEMBER_ME_NODE: 'REMEMBER_ME_NODE',
  FORGOT_PASSWORD_NODE: 'FORGOT_PASSWORD_NODE',
  THEME_NODE: 'THEME_NODE',
  BACKGROUND_NODE: 'BACKGROUND_NODE'
};

function createNode(type, value, line) {
  return { type, value, line };
}

module.exports = {
  NodeType,
  createNode
};
