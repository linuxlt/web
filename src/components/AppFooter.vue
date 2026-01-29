<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3 class="footer-title">Linux.lt</h3>
        <p class="footer-text">Lietuvos Linux bendruomenės puslapis. Visos teisės saugomos įstatymo.</p>
      </div>

      <div class="footer-section">
        <h4 class="footer-subtitle">Nuorodos</h4>
        <nav class="footer-nav">
          <a href="/news.html">Naujienos</a>
          <a href="/meetups.html">Renginiai</a>
          <a href="/community.html">Bendruomenė</a>
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
