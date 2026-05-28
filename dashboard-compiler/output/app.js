const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('sidebarToggle');
const themeButton = document.getElementById('themeToggle');

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
  if (window.innerWidth > 1024 && sidebar) {
    sidebar.classList.remove('sidebar-open');
  }
});
