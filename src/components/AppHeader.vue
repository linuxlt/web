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

<a href="https://github.com/linuxlt/web" class="github-corner" aria-label="View source on GitHub">
<svg width="80" height="80" viewBox="0 0 250 250"
  style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true;">
  <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"/>
  <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7
    120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 1
    25.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
    fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"/>
  <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6
    C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0
    C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1
    C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4
    C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9
    C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5
    C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9
    152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
    fill="currentColor" class="octo-body"/>
</svg></a>

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

.github-corner {
  z-index: 200;
  position: relative;
}

.github-corner:hover .octo-arm {
  animation:octocat-wave 560ms ease-in-out
}

@keyframes octocat-wave{
  0%,100%{
    transform:rotate(0)
  }
  20%,60%{
    transform:rotate(-25deg)
  }
  40%,80%{
    transform:rotate(10deg)
  }
}
@media (max-width:500px){
  .github-corner:hover .octo-arm{
    animation:none
  }
  .github-corner .octo-arm{
    animation:octocat-wave 560ms ease-in-out
  }
}

</style>

