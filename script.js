document.addEventListener('DOMContentLoaded', () => {
  fetch('sidebar.html')
    .then(response => response.text())
    .then(html => {
      document.querySelectorAll('.sidebar').forEach(el => el.outerHTML = html);
    });
});