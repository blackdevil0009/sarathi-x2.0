const { NodeType } = require('./ast');

class Generator {
  generate(ast) {
    const config = {
      pageName: 'StudentLogin',
      title: 'Student Login',
      subtitle: 'Student Portal',
      buttonLabel: 'Student Login',
      rememberMe: true,
      forgotPassword: true,
      theme: 'dark',
      background: 'gradient',
      fields: []
    };

    ast.forEach((node) => {
      switch (node.type) {
        case NodeType.PAGE_NODE:
          config.pageName = node.value;
          break;
        case NodeType.TITLE_NODE:
          config.title = node.value;
          break;
        case NodeType.SUBTITLE_NODE:
          config.subtitle = node.value;
          break;
        case NodeType.STUDENT_ID_NODE:
          config.fields.push({ id: 'student-id', label: 'Student ID', type: 'text', placeholder: 'Enter your student ID' });
          break;
        case NodeType.PASSWORD_NODE:
          config.fields.push({ id: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' });
          break;
        case NodeType.BUTTON_NODE:
          config.buttonLabel = node.value;
          break;
        case NodeType.REMEMBER_ME_NODE:
          config.rememberMe = node.value;
          break;
        case NodeType.FORGOT_PASSWORD_NODE:
          config.forgotPassword = node.value;
          break;
        case NodeType.THEME_NODE:
          config.theme = ['dark', 'light'].includes(node.value.toLowerCase()) ? node.value.toLowerCase() : 'dark';
          break;
        case NodeType.BACKGROUND_NODE:
          config.background = ['gradient', 'solid'].includes(node.value.toLowerCase()) ? node.value.toLowerCase() : 'gradient';
          break;
        default:
          break;
      }
    });

    if (!config.fields.length) {
      config.fields = [
        { id: 'student-id', label: 'Student ID', type: 'text', placeholder: 'Enter your student ID' },
        { id: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' }
      ];
    }

    const themeStyles = this.getThemeStyles(config.theme, config.background);

    const fieldsHtml = config.fields.map((field) => `
      <div class="field">
        <label for="${field.id}">${field.label}</label>
        <input id="${field.id}" type="${field.type}" placeholder="${field.placeholder}" />
      </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${config.title}</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${themeStyles.bodyBackground};
      color: ${themeStyles.textColor};
      font-family: Inter, system-ui, sans-serif;
    }

    .card {
      width: min(100%, 460px);
      padding: 36px;
      border-radius: 30px;
      background: ${themeStyles.cardBackground};
      box-shadow: 0 28px 90px rgba(15, 23, 42, 0.3);
      backdrop-filter: blur(18px);
    }

    .card h1 {
      margin: 0 0 10px;
      font-size: clamp(2rem, 3.5vw, 2.6rem);
    }

    .card p {
      margin: 0 0 26px;
      color: ${themeStyles.subtitleColor};
      line-height: 1.7;
    }

    .field {
      display: grid;
      gap: 10px;
      margin-bottom: 18px;
    }

    .field label {
      color: ${themeStyles.labelColor};
      font-size: 0.95rem;
    }

    .field input {
      width: 100%;
      padding: 15px 16px;
      border-radius: 16px;
      border: 1px solid ${themeStyles.inputBorder};
      background: ${themeStyles.inputBackground};
      color: ${themeStyles.inputColor};
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    }

    .field input:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.12);
      transform: translateY(-1px);
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      margin: 20px 0 28px;
      flex-wrap: wrap;
    }

    .checkbox {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: ${themeStyles.labelColor};
      font-size: 0.95rem;
    }

    .checkbox input {
      width: 18px;
      height: 18px;
      accent-color: #60a5fa;
    }

    .button {
      width: 100%;
      padding: 16px;
      border: none;
      border-radius: 18px;
      background: linear-gradient(135deg, #38bdf8 0%, #2563eb 100%);
      color: #ffffff;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s ease, filter 0.2s ease;
      box-shadow: 0 18px 35px rgba(37, 99, 235, 0.24);
    }

    .button:hover {
      transform: translateY(-1px);
      filter: brightness(1.05);
    }

    .link {
      color: ${themeStyles.linkColor};
      text-decoration: none;
      font-size: 0.95rem;
    }

    @media (max-width: 520px) {
      .card {
        padding: 28px;
      }

      .actions {
        flex-direction: column;
        align-items: stretch;
      }
    }
  </style>
</head>
<body>
  <section class="card">
    <h1>${config.title}</h1>
    <p>${config.subtitle}</p>
    <form>${fieldsHtml}
      <div class="actions">
        ${config.rememberMe ? `
        <label class="checkbox">
          <input type="checkbox" />
          Remember me
        </label>
        ` : ''}
        ${config.forgotPassword ? '<a class="link" href="#">Forgot password?</a>' : ''}
      </div>
      <button class="button" type="button">${config.buttonLabel}</button>
    </form>
  </section>
</body>
</html>`;
  }

  getThemeStyles(theme, background) {
    const isDark = theme === 'dark';
    const bodyBackground = background === 'gradient'
      ? (isDark ? 'linear-gradient(135deg, #030712 0%, #0f172a 100%)' : 'linear-gradient(135deg, #eef2ff 0%, #dbeafe 100%)')
      : (isDark ? '#020617' : '#f8fafc');

    return {
      bodyBackground,
      textColor: isDark ? '#e2e8f0' : '#0f172a',
      cardBackground: isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.92)',
      subtitleColor: isDark ? '#94a3b8' : '#475569',
      labelColor: isDark ? '#cbd5e1' : '#475569',
      inputBackground: isDark ? 'rgba(15, 23, 42, 0.82)' : '#ffffff',
      inputBorder: isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.38)',
      inputColor: isDark ? '#f8fafc' : '#0f172a',
      linkColor: isDark ? '#93c5fd' : '#2563eb'
    };
  }
}

module.exports = Generator;
