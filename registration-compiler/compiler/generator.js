const { NodeType } = require('./ast');

class Generator {
  generate(ast) {
    const config = {
      pageName: 'StudentRegistration',
      title: 'Student Registration',
      subtitle: 'Create your student account with Sarthi-X.',
      buttonLabel: 'Register Now',
      theme: 'dark',
      background: 'gradient',
      termsCheckbox: true,
      fields: {
        fullName: false,
        email: false,
        phone: false,
        studentId: false,
        password: false,
        confirmPassword: false,
        gender: false,
        birthDate: false,
        course: false,
        year: false
      }
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
        case NodeType.BUTTON_NODE:
          config.buttonLabel = node.value;
          break;
        case NodeType.FULL_NAME_NODE:
          config.fields.fullName = true;
          break;
        case NodeType.EMAIL_NODE:
          config.fields.email = true;
          break;
        case NodeType.PHONE_NODE:
          config.fields.phone = true;
          break;
        case NodeType.STUDENT_ID_NODE:
          config.fields.studentId = true;
          break;
        case NodeType.PASSWORD_NODE:
          config.fields.password = true;
          break;
        case NodeType.CONFIRM_PASSWORD_NODE:
          config.fields.confirmPassword = true;
          break;
        case NodeType.GENDER_NODE:
          config.fields.gender = true;
          break;
        case NodeType.DATE_OF_BIRTH_NODE:
          config.fields.birthDate = true;
          break;
        case NodeType.COURSE_NODE:
          config.fields.course = true;
          break;
        case NodeType.YEAR_NODE:
          config.fields.year = true;
          break;
        case NodeType.TERMS_CHECKBOX_NODE:
          config.termsCheckbox = node.value;
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

    const themeStyles = this.getThemeStyles(config.theme, config.background);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${config.title}</title>
  <style>
    :root {
      color-scheme: ${config.theme};
      font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.5;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: ${themeStyles.bodyBackground};
      color: ${themeStyles.textColor};
    }

    .page {
      width: min(100%, 1080px);
      border-radius: 32px;
      padding: 36px;
      background: ${themeStyles.cardBackground};
      backdrop-filter: blur(24px);
      box-shadow: 0 32px 90px rgba(5, 11, 34, 0.28);
      border: 1px solid rgba(255, 255, 255, 0.08);
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 30px;
    }

    .hero {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
    }

    .hero h1 {
      margin: 0;
      font-size: clamp(2.6rem, 4vw, 3.4rem);
      letter-spacing: -0.04em;
    }

    .hero p {
      margin: 0;
      color: ${themeStyles.subtitleColor};
      max-width: 520px;
      font-size: 1rem;
    }

    .form-section {
      display: grid;
      gap: 18px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
    }

    .form-group {
      display: grid;
      gap: 12px;
    }

    .form-group label {
      color: ${themeStyles.labelColor};
      font-size: 0.95rem;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 16px 18px;
      border-radius: 18px;
      border: 1px solid ${themeStyles.inputBorder};
      background: ${themeStyles.inputBackground};
      color: ${themeStyles.inputColor};
      outline: none;
      transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }

    .form-group input:focus,
    .form-group select:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.12);
      transform: translateY(-1px);
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 12px;
      color: ${themeStyles.labelColor};
      font-size: 0.95rem;
    }

    .checkbox-group input {
      width: 18px;
      height: 18px;
      accent-color: #60a5fa;
    }

    .button {
      width: 100%;
      padding: 18px 20px;
      border: none;
      border-radius: 20px;
      background: linear-gradient(135deg, #38bdf8 0%, #2563eb 100%);
      color: #ffffff;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s ease, filter 0.2s ease;
      box-shadow: 0 18px 40px rgba(56, 189, 248, 0.24);
    }

    .button:hover {
      transform: translateY(-1px);
      filter: brightness(1.03);
    }

    @media (max-width: 900px) {
      .page {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .page {
        padding: 24px;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <section class="page">
    <div class="hero">
      <h1>${config.title}</h1>
      <p>${config.subtitle}</p>
    </div>
    <form class="form-section">
      <div class="form-grid">
        ${config.fields.fullName ? `<div class="form-group"><label for="full-name">Full Name</label><input id="full-name" type="text" placeholder="Jane Doe" /></div>` : ''}
        ${config.fields.email ? `<div class="form-group"><label for="email">Email</label><input id="email" type="email" placeholder="student@example.com" /></div>` : ''}
        ${config.fields.phone ? `<div class="form-group"><label for="phone">Phone</label><input id="phone" type="tel" placeholder="(123) 456-7890" /></div>` : ''}
        ${config.fields.studentId ? `<div class="form-group"><label for="student-id">Student ID</label><input id="student-id" type="text" placeholder="S1234567" /></div>` : ''}
        ${config.fields.password ? `<div class="form-group"><label for="password">Password</label><input id="password" type="password" placeholder="Create a password" /></div>` : ''}
        ${config.fields.confirmPassword ? `<div class="form-group"><label for="confirm-password">Confirm Password</label><input id="confirm-password" type="password" placeholder="Confirm your password" /></div>` : ''}
        ${config.fields.gender ? `<div class="form-group"><label for="gender">Gender</label><select id="gender"><option value="">Select gender</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select></div>` : ''}
        ${config.fields.birthDate ? `<div class="form-group"><label for="birth-date">Date of Birth</label><input id="birth-date" type="date" /></div>` : ''}
        ${config.fields.course ? `<div class="form-group"><label for="course">Course</label><select id="course"><option value="">Select course</option><option>Computer Science</option><option>Engineering</option><option>Business Management</option><option>Design</option></select></div>` : ''}
        ${config.fields.year ? `<div class="form-group"><label for="year">Academic Year</label><select id="year"><option value="">Select year</option><option>First Year</option><option>Second Year</option><option>Third Year</option><option>Final Year</option></select></div>` : ''}
      </div>
      ${config.termsCheckbox ? `<div class="checkbox-group"><input id="terms" type="checkbox" /><label for="terms">I agree to the terms and conditions</label></div>` : ''}
      <button class="button" type="button">${config.buttonLabel}</button>
    </form>
  </section>
</body>
</html>`;
  }

  getThemeStyles(theme, background) {
    const isDark = theme === 'dark';
    const bodyBackground = background === 'gradient'
      ? (isDark ? 'radial-gradient(circle at top left, rgba(56, 189, 248, 0.2), transparent 32%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.16), transparent 30%), linear-gradient(135deg, #020617 0%, #0c1724 100%)' : 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.18), transparent 32%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.14), transparent 28%), linear-gradient(135deg, #eef2ff 0%, #dbeafe 100%)')
      : (isDark ? '#071018' : '#f8fafc');

    return {
      bodyBackground,
      textColor: isDark ? '#e2e8f0' : '#0f172a',
      cardBackground: isDark ? 'rgba(12, 18, 34, 0.88)' : 'rgba(255, 255, 255, 0.96)',
      subtitleColor: isDark ? '#9fb4d3' : '#475569',
      labelColor: isDark ? '#cbd5e1' : '#475569',
      inputBackground: isDark ? 'rgba(15, 23, 42, 0.88)' : '#ffffff',
      inputBorder: isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.32)',
      inputColor: isDark ? '#f8fafc' : '#0f172a'
    };
  }
}

module.exports = Generator;
