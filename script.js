fetch('/components/sidebar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('sidebar-placeholder').innerHTML = html;
  });
