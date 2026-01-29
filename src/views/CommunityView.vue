<script setup>
const communityLinks = [
  {
    title: 'IRC',
    description: 'Daug metų Aitvaro IRC tinkle gyvuojantis #Linux kanalas.',
    url: 'https://irc.linux.lt/',
    urlText: 'irc://irc.linux.lt/',
    icon: '💬'
  },
  {
    title: 'Matrix',
    description: 'Saugiems pokalbiams apie Linux skirta Matrix grupė.',
    url: 'https://matrix.to/#/#linuxusergroup:matrix.org',
    urlText: '#linuxusergroup:matrix.org',
    icon: '🔗'
  },
  {
    title: 'Signal',
    description: 'Grupė kurioje daugiausiai bendrauja diegtuvių dalyviai.',
    url: 'https://signal.group/#CjQKIFhi0bOBCIwBVLEtbE1i0Rq4lF3fv8MC1-f6RmAjllqhEhB1POFrUgR1f4BNXD11RtX2',
    urlText: 'Signal grupė',
    icon: '📱'
  }
]
</script>

<template>
  <div class="community-view">
    <header class="page-header">
      <h1>Bendruomenė</h1>
      <p class="page-description">Aktyvios lietuviškos online grupės:</p>
    </header>

    <section class="section">
      <h2 class="section-title">Kaip prisijungti?</h2>
      <div class="community-grid">
        <a
          v-for="link in communityLinks"
          :key="link.title"
          :href="link.url"
          class="community-card card"
          target="_blank"
          rel="noopener"
        >
          <div class="community-icon">{{ link.icon }}</div>
          <h3 class="community-title">{{ link.title }}</h3>
          <p class="community-description">{{ link.description }}</p>
          <span class="community-link">{{ link.urlText }}</span>
        </a>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Kitos nuorodos</h2>
      <ul class="links-list">
        <li>
          <a href="http://sls.archlinux.lt/" target="_blank" rel="noopener">archlinux.lt</a> -
          Arch Linux forumas lietuviškai
        </li>
        <li>
          <a href="http://www.akl.lt/" target="_blank" rel="noopener">Atviras Kodas Lietuvai</a> -
          Baltix-Ubuntu distribucija (atnaujinta 2025-08)
        </li>
        <li>
          <a href="https://distrowatch.com/" target="_blank" rel="noopener">DistroWatch</a> -
          Linux distribucijų naujienos ir palyginimas
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.page-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.page-header h1 {
  margin-bottom: 0.5rem;
}

.page-description {
  color: var(--color-text-muted);
  margin-bottom: 0;
}

.intro-section {
  border-bottom: 1px solid var(--color-border);
}

.intro-text {
  font-size: 1.125rem;
  max-width: 800px;
}

.community-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.community-card {
  display: block;
  text-align: center;
  transition: transform 0.2s ease;
}

.community-card:hover {
  transform: translateY(-4px);
}

.community-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.community-title {
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.community-description {
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.community-link {
  display: inline-block;
  color: var(--color-primary);
  font-family: monospace;
  font-size: 0.875rem;
  background: var(--color-background-alt);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
}

.irc-guide {
  max-width: 800px;
}

.irc-guide h3 {
  margin-top: 1.5rem;
}

.irc-guide code {
  background: var(--color-background-alt);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.9em;
}

.irc-guide ol,
.irc-guide ul {
  margin-bottom: 0;
}

.links-list {
  max-width: 800px;
}

.links-list li {
  margin-bottom: 0.75rem;
}
</style>
