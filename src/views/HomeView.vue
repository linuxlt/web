<script setup>
import NewsCard from '../components/NewsCard.vue'
import MeetupCard from '../components/MeetupCard.vue'

const newsModules = import.meta.glob('../content/news/*.md', { eager: true })
const meetupModules = import.meta.glob('../content/meetups/*.md', { eager: true })

const latestNews = Object.entries(newsModules)
  .map(([path, module]) => {
    const slug = path.split('/').pop().replace('.md', '')
    const author = module.author || module.frontmatter?.author || ''
    return {
      title: module.title || module.frontmatter?.title || 'Untitled',
      date: module.date || module.frontmatter?.date || '',
      excerpt: module.excerpt || module.frontmatter?.excerpt || '',
      author,
      authorSlug: author.toLowerCase().replace(/\s+/g, '-'),
      slug
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3)

const now = new Date()
const upcomingMeetups = Object.entries(meetupModules)
  .map(([path, module]) => {
    const slug = path.split('/').pop().replace('.md', '')
    const author = module.author || module.frontmatter?.author || ''
    return {
      slug,
      title: module.title || module.frontmatter?.title || 'Untitled',
      date: module.date || module.frontmatter?.date || '',
      location: module.location || module.frontmatter?.location || '',
      description: module.description || module.frontmatter?.description || '',
      author,
      authorSlug: author.toLowerCase().replace(/\s+/g, '-')
    }
  })
  .filter(m => new Date(m.date) >= now)
  .sort((a, b) => new Date(a.date) - new Date(b.date))
  .slice(0, 3)

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
  <div class="home">
    <!-- News and Meetups in two columns -->
    <div class="two-columns">
      <!-- Latest News -->
      <section class="column">
        <h2 class="section-title">Naujienos:</h2>
        <div class="news-list">
          <NewsCard
            v-for="post in latestNews"
            :key="post.slug"
            :title="post.title"
            :date="post.date"
            :excerpt="post.excerpt"
            :slug="post.slug"
            :author="post.author"
            :author-slug="post.authorSlug"
          />
        </div>
        <div class="section-footer">
          <a href="/news.html" class="btn btn-outline">Visos naujienos</a>
        </div>
      </section>

      <!-- Upcoming Meetups -->
      <section class="column">
        <h2 class="section-title">Artėjantys renginiai:</h2>
        <div v-if="upcomingMeetups.length" class="meetups-list">
          <MeetupCard
            v-for="meetup in upcomingMeetups"
            :key="meetup.slug"
            :title="meetup.title"
            :date="meetup.date"
            :location="meetup.location"
            :description="meetup.description"
            :slug="meetup.slug"
            :author="meetup.author"
            :author-slug="meetup.authorSlug"
          />
        </div>
        <p v-else class="no-meetups">Šiuo metu nėra suplanuotų susitikimų. Sekite naujienas!</p>
        <div class="section-footer">
          <a href="/meetups.html" class="btn btn-outline">Visi renginiai</a>
        </div>
      </section>
    </div>

    <!-- Community Links -->
    <section class="section">
      <h2 class="section-title">Bendruomenė:</h2>
      <div class="community-grid">
        <a
          v-for="link in communityLinks"
          :key="link.title"
          :href="link.url"
          class="community-card"
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
  </div>
</template>

<style scoped>
.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.column {
  display: flex;
  flex-direction: column;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex: 1;
}

.meetups-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex: 1;
}

.no-meetups {
  color: var(--color-text-muted);
  padding: 2rem;
  text-align: center;
  background: var(--color-background-alt);
  border-radius: 8px;
  margin-bottom: 1.5rem;
  flex: 1;
}

@media (max-width: 768px) {
  .two-columns {
    grid-template-columns: 1fr;
  }
}

.community-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.community-card {
  display: block;
  padding: 1.5rem;
  background: var(--color-background-alt);
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.community-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.community-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.community-title {
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.community-description {
  color: var(--color-text-muted);
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.community-link {
  display: inline-block;
  color: var(--color-primary);
  font-family: monospace;
  font-size: 0.875rem;
  background: var(--color-background);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
}

.section-footer {
  text-align: center;
}
</style>
