<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NewsCard from '../components/NewsCard.vue'
import MeetupCard from '../components/MeetupCard.vue'

const route = useRoute()

const newsModules = import.meta.glob('../content/news/*.md', { eager: true })
const meetupModules = import.meta.glob('../content/meetups/*.md', { eager: true })

const authorSlug = computed(() => route.params.slug)

const authorNews = computed(() => {
  return Object.entries(newsModules)
    .map(([path, module]) => {
      const slug = path.split('/').pop().replace('.md', '')
      return {
        title: module.title || module.frontmatter?.title || 'Untitled',
        date: module.date || module.frontmatter?.date || '',
        excerpt: module.excerpt || module.frontmatter?.excerpt || '',
        author: module.author || module.frontmatter?.author || '',
        slug
      }
    })
    .filter(post => post.author && post.author.toLowerCase().replace(/\s+/g, '-') === authorSlug.value)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const authorMeetups = computed(() => {
  return Object.entries(meetupModules)
    .map(([path, module]) => {
      const slug = path.split('/').pop().replace('.md', '')
      return {
        slug,
        title: module.title || module.frontmatter?.title || 'Untitled',
        date: module.date || module.frontmatter?.date || '',
        location: module.location || module.frontmatter?.location || '',
        description: module.description || module.frontmatter?.description || '',
        author: module.author || module.frontmatter?.author || ''
      }
    })
    .filter(meetup => meetup.author && meetup.author.toLowerCase().replace(/\s+/g, '-') === authorSlug.value)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const authorName = computed(() => {
  const firstPost = authorNews.value[0] || authorMeetups.value[0]
  return firstPost?.author || authorSlug.value
})
</script>

<template>
  <div class="author-view">
    <header class="page-header">
      <h1>{{ authorName }}</h1>
      <p class="page-description">Visi įrašai</p>
    </header>

    <section v-if="authorNews.length" class="section">
      <h2 class="section-title">Naujienos</h2>
      <div class="news-list">
        <NewsCard
          v-for="post in authorNews"
          :key="post.slug"
          :title="post.title"
          :date="post.date"
          :excerpt="post.excerpt"
          :slug="post.slug"
        />
      </div>
    </section>

    <section v-if="authorMeetups.length" class="section">
      <h2 class="section-title">Renginiai</h2>
      <div class="meetups-list">
        <MeetupCard
          v-for="meetup in authorMeetups"
          :key="meetup.slug"
          :title="meetup.title"
          :date="meetup.date"
          :location="meetup.location"
          :description="meetup.description"
          :slug="meetup.slug"
        />
      </div>
    </section>

    <div v-if="!authorNews.length && !authorMeetups.length" class="not-found">
      <p>Šio autoriaus įrašų nerasta.</p>
      <a href="/index.html" class="btn btn-primary">Grįžti į pradžią</a>
    </div>
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

.news-list,
.meetups-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.not-found {
  text-align: center;
  padding: 4rem 0;
}

.not-found p {
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}
</style>
