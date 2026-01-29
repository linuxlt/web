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
        <RouterLink to="/news.html" class="nav-link" @click="isMenuOpen = false">Naujienos</RouterLink>
        <RouterLink to="/meetups.html" class="nav-link" @click="isMenuOpen = false">Renginiai</RouterLink>
        <RouterLink to="/community.html" class="nav-link" @click="isMenuOpen = false">Bendruomenė</RouterLink>
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
