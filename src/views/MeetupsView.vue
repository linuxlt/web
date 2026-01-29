<script setup>
import MeetupCard from '../components/MeetupCard.vue'

const modules = import.meta.glob('../content/meetups/*.md', { eager: true })

const allMeetups = Object.entries(modules)
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
  .sort((a, b) => new Date(b.date) - new Date(a.date))

const now = new Date()
const upcomingMeetups = allMeetups.filter(m => new Date(m.date) >= now)
const pastMeetups = allMeetups.filter(m => new Date(m.date) < now)
</script>

<template>
  <div class="meetups-view">
    <header class="page-header">
      <h1>Renginiai</h1>
      <p class="page-description">Bendruomenės renginiai ir susibūrimai</p>
    </header>

    <section class="section">
      <h2 class="section-title">Artėjantys renginiai</h2>
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
    </section>

    <section class="section">
      <h2 class="section-title">Praėję renginiai</h2>
      <div v-if="pastMeetups.length" class="meetups-list">
        <MeetupCard
          v-for="meetup in pastMeetups"
          :key="meetup.slug"
          :title="meetup.title"
          :date="meetup.date"
          :location="meetup.location"
          :description="meetup.description"
          :slug="meetup.slug"
          :author="meetup.author"
          :author-slug="meetup.authorSlug"
          :is-past="true"
        />
      </div>
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

.meetups-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.no-meetups {
  color: var(--color-text-muted);
  padding: 2rem;
  text-align: center;
  background: var(--color-background-alt);
  border-radius: 8px;
}
</style>
