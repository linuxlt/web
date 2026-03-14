<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3 class="footer-title">Linux.lt</h3>
          <nav class="footer-nav">
            <div><p class="footer-text">Visos teisės saugomos įstatymo.</p></div>
            <a href="https://github.com/linuxlt/web">GitHub</a> <a href="/feed.xml" class="rss-link">
            <svg class="rss-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20 4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
            </svg>
            RSS
          </a>
          </nav>
          
      </div>

      <div class="footer-section">
        <h4 class="footer-subtitle">Nuorodos</h4>
        <nav class="footer-nav">
          <RouterLink to="/news.html">Naujienos</RouterLink>
          <RouterLink to="/meetups.html">Renginiai</RouterLink>
          <RouterLink to="/community.html">Bendruomenė</RouterLink>
        </nav>
      </div>

      <div class="footer-section">
        <h4 class="footer-subtitle">Bendruomenė</h4>
        <nav class="footer-nav">
          <a href="https://irc.linux.lt/" target="_blank">IRC</a>
          <a href="https://matrix.to/#/#linuxusergroup:matrix.org" target="_blank">Matrix</a>
          <a href="https://signal.group/#CjQKIFhi0bOBCIwBVLEtbE1i0Rq4lF3fv8MC1-f6RmAjllqhEhB1POFrUgR1f4BNXD11RtX2" target="_blank">Signal</a>
        </nav>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} Linux.lt. Licensed under CC BY 4.0</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-background-alt);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.footer-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 3rem 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.footer-title {
  font-size: 1.25rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.footer-subtitle {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.footer-text {
  color: var(--color-text-muted);
  margin-bottom: 0;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-nav a {
  color: var(--color-text-muted);
}

.footer-nav a:hover {
  color: var(--color-primary);
}

.rss-link {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.rss-link:hover {
  color: #f26522 !important;
}

.rss-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  flex-shrink: 0;
}

.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding: 1.5rem 1rem;
  text-align: center;
}

.footer-bottom p {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin-bottom: 0;
}
</style>
