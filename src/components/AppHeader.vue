<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="header">
    <div class="header-container">
      <RouterLink to="/index.html" class="logo">
        <span class="logo-text">Linux.lt</span>
      </RouterLink>

      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
        <span class="menu-icon" :class="{ open: isMenuOpen }"></span>
      </button>

      <nav class="nav" :class="{ open: isMenuOpen }">
        <RouterLink to="/index.html" class="nav-link" @click="isMenuOpen = false">Pradžia</RouterLink>
        <RouterLink to="/community.html" class="nav-link" @click="isMenuOpen = false">Bendruomenė</RouterLink>
        <RouterLink to="/news.html" class="nav-link" @click="isMenuOpen = false">Naujienos</RouterLink>
        <RouterLink to="/meetups.html" class="nav-link" @click="isMenuOpen = false">Renginiai</RouterLink>
        <a href="/feed.xml" class="nav-link rss-link" title="RSS prenumerata" @click="isMenuOpen = false">
          <svg class="rss-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="RSS">
            <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20 4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
          </svg>
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-height);
}

.header-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--color-text);
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: width 0.2s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-link.router-link-active {
  color: var(--color-primary);
}

.rss-link {
  display: flex;
  align-items: center;
  color: var(--color-text-muted);
}

.rss-link:hover {
  color: #f26522;
}

.rss-link::after {
  display: none;
}

.rss-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  position: relative;
  transition: background 0.2s ease;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  transition: transform 0.2s ease;
}

.menu-icon::before {
  top: -8px;
}

.menu-icon::after {
  top: 8px;
}

.menu-icon.open {
  background: transparent;
}

.menu-icon.open::before {
  transform: translateY(8px) rotate(45deg);
}

.menu-icon.open::after {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav {
    position: absolute;
    top: var(--header-height);
    left: 0;
    right: 0;
    background: var(--color-background);
    flex-direction: column;
    padding: 1rem;
    gap: 0;
    border-bottom: 1px solid var(--color-border);
    display: none;
  }

  .nav.open {
    display: flex;
  }

  .nav-link {
    padding: 1rem;
    border-bottom: 1px solid var(--color-border);
  }

  .nav-link:last-child {
    border-bottom: none;
  }
}
</style>
