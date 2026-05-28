const { NodeType } = require('./ast');

class Generator {
  generate(ast) {
    const config = this.buildConfig(ast);
    return {
      html: this.generateHtml(config),
      css: this.generateCss(config),
      js: this.generateJs(config)
    };
  }

  buildConfig(ast) {
    const config = {
      page: 'Student Dashboard',
      title: 'Student Dashboard',
      welcome: 'Welcome, Student',
      sidebar: [],
      cards: [],
      profile: {
        name: 'Student',
        id: 'STU00000'
      },
      theme: 'dark',
      layout: 'modern'
    };

    ast.forEach((node) => {
      switch (node.type) {
        case NodeType.PAGE_NODE:
          config.page = node.value;
          break;
        case NodeType.TITLE_NODE:
          config.title = node.value;
          break;
        case NodeType.WELCOME_MESSAGE_NODE:
          config.welcome = node.value;
          break;
        case NodeType.SIDEBAR_NODE:
          config.sidebar = node.items.map((item) => item.value);
          break;
        case NodeType.CARDS_NODE:
          config.cards = node.items.map((item) => ({ title: item.title, value: item.value }));
          break;
        case NodeType.PROFILE_SECTION_NODE:
          node.items.forEach((item) => {
            if (item.type === NodeType.PROFILE_NAME_NODE) {
              config.profile.name = item.value;
            }
            if (item.type === NodeType.PROFILE_ID_NODE) {
              config.profile.id = item.value;
            }
          });
          break;
        case NodeType.THEME_NODE:
          config.theme = node.value.toLowerCase();
          break;
        case NodeType.LAYOUT_NODE:
          config.layout = node.value.toLowerCase();
          break;
        default:
          break;
      }
    });

    return config;
  }

  generateHtml(config) {
    const sidebarItems = config.sidebar.map((item) => `<li><a href="#">${item}</a></li>`).join('\n            ');
    const cards = config.cards.map((card) => `
          <article class="dashboard-card">
            <div class="card-header">
              <span>${card.title}</span>
              <span class="card-value">${card.value}</span>
            </div>
          </article>
        `).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${config.title}</title>
  <link rel="stylesheet" href="./style.css" />
</head>
<body class="dashboard-app ${config.theme === 'light' ? 'light-theme' : 'dark-theme'}">
  <div class="layout-shell ${config.layout}">
    <aside class="sidebar" id="sidebar">
      <div class="brand">
        <h1>${config.page}</h1>
      </div>
      <nav class="nav-menu">
        <ul>
            ${sidebarItems}
        </ul>
      </nav>
    </aside>
    <main class="content-area">
      <header class="topbar">
        <button id="sidebarToggle" class="sidebar-toggle" aria-label="Toggle sidebar">☰</button>
        <div>
          <h2>${config.title}</h2>
          <p>${config.welcome}</p>
        </div>
        <button id="themeToggle" class="theme-toggle">Switch theme</button>
      </header>
      <section class="dashboard-grid">
        ${cards}
      </section>
      <section class="profile-panel">
        <div class="profile-card">
          <h3>Profile</h3>
          <p class="profile-name">${config.profile.name}</p>
          <p class="profile-id">${config.profile.id}</p>
        </div>
      </section>
    </main>
  </div>
  <script src="./app.js"></script>
</body>
</html>`;
  }

  generateCss(config) {
    return `:root {
  --bg: #020617;
  --surface: rgba(15, 23, 42, 0.94);
  --surface-soft: rgba(30, 41, 59, 0.92);
  --text: #e2e8f0;
  --muted: #94a3b8;
  --primary: #38bdf8;
  --primary-dark: #0ea5e9;
  --card: rgba(15, 23, 42, 0.78);
  --shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
}

body,
html {
  margin: 0;
  min-height: 100%;
  font-family: Inter, system-ui, sans-serif;
  background: linear-gradient(180deg, #020617 0%, #071117 100%);
  color: var(--text);
}

.dashboard-app.light-theme {
  --bg: #f8fafc;
  --surface: rgba(255, 255, 255, 0.92);
  --surface-soft: rgba(248, 250, 252, 0.98);
  --text: #0f172a;
  --muted: #475569;
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --card: rgba(255, 255, 255, 0.94);
  --shadow: 0 20px 60px rgba(15, 23, 42, 0.12);
  background: linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%);
}

.dashboard-app {
  min-height: 100vh;
  background: var(--bg);
}

.layout-shell {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 28px;
  padding: 24px;
}

.sidebar {
  position: sticky;
  top: 24px;
  align-self: start;
  padding: 28px;
  border-radius: 32px;
  background: var(--surface);
  box-shadow: var(--shadow);
  min-height: calc(100vh - 48px);
}

.brand h1 {
  margin: 0 0 22px;
  font-size: 1.5rem;
  letter-spacing: -0.04em;
}

.nav-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu li + li {
  margin-top: 12px;
}

.nav-menu a {
  display: block;
  padding: 14px 18px;
  border-radius: 18px;
  color: var(--text);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.04);
  transition: transform 0.2s ease, background 0.2s ease;
}

.nav-menu a:hover {
  background: rgba(56, 189, 248, 0.18);
  transform: translateX(4px);
}

.content-area {
  display: grid;
  gap: 24px;
}

.topbar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 18px;
  padding: 22px 26px;
  border-radius: 30px;
  background: var(--surface);
  box-shadow: var(--shadow);
}

.topbar h2 {
  margin: 0 0 6px;
  font-size: 1.85rem;
}

.topbar p {
  margin: 0;
  color: var(--muted);
}

.sidebar-toggle,
.theme-toggle {
  border: none;
  background: rgba(56, 189, 248, 0.16);
  color: var(--text);
  padding: 14px 18px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 0.95rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.dashboard-card {
  min-height: 150px;
  background: var(--card);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  padding: 24px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.dashboard-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.22);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  font-size: 1rem;
  color: var(--muted);
}

.card-value {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text);
}

.profile-panel {
  display: grid;
  gap: 20px;
}

.profile-card {
  padding: 28px;
  border-radius: 30px;
  background: var(--surface);
  box-shadow: var(--shadow);
}

.profile-card h3 {
  margin: 0 0 18px;
}

.profile-name,
.profile-id {
  margin: 8px 0 0;
  color: var(--muted);
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .layout-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: relative;
    min-height: auto;
  }
}

@media (max-width: 760px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .topbar {
    grid-template-columns: 1fr;
  }
}
`;
  }

  generateJs(config) {
    return `const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('sidebarToggle');
const themeButton = document.getElementById('themeToggle');
const root = document.documentElement;

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-open');
  });
}

if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) {
    sidebar.classList.remove('sidebar-open');
  }
});
`;
  }
}

module.exports = Generator;
