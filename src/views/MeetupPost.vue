<script setup>
import { ref, onMounted, shallowRef } from 'vue'

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const modules = import.meta.glob('../content/meetups/*.md', { eager: true })

const meetups = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => {
    const slug = path.split('/').pop().replace('.md', '')
    const author = module.author || module.frontmatter?.author || ''
    return [slug, {
      title: module.title || module.frontmatter?.title || 'Untitled',
      date: module.date || module.frontmatter?.date || '',
      location: module.location || module.frontmatter?.location || '',
      author,
      authorSlug: author.toLowerCase().replace(/\s+/g, '-'),
      component: module.default
    }]
  })
)

const meetup = ref(null)
const MeetupComponent = shallowRef(null)
const notFound = ref(false)

const loadMeetup = () => {
  if (meetups[props.slug]) {
    meetup.value = meetups[props.slug]
    MeetupComponent.value = meetups[props.slug].component
    notFound.value = false
  } else {
    meetup.value = null
    MeetupComponent.value = null
    notFound.value = true
  }
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('lt-LT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(loadMeetup)
</script>

<template>
  <div class="meetup-post">
    <div v-if="notFound" class="not-found">
      <h1>Susitikimas nerastas</h1>
      <p>Atsiprašome, tačiau ieškomas susitikimas neegzistuoja.</p>
      <a href="/meetups.html" class="btn btn-primary">Grįžti į susitikimus</a>
    </div>

    <article v-else-if="meetup" class="post">
      <header class="post-header">
        <a href="/meetups.html" class="back-link">&larr; Grįžti į susitikimus</a>
        <h1 class="post-title">{{ meetup.title }}</h1>
        <div class="post-meta">
          <time class="post-date">{{ formatDate(meetup.date) }}</time>
          <span v-if="meetup.location" class="post-location">{{ meetup.location }}</span>
          <span v-if="meetup.author" class="post-author">
            <a :href="`/author/${meetup.authorSlug}.html`">{{ meetup.author }}</a>
          </span>
        </div>
      </header>

      <div class="post-content markdown-content">
        <component :is="MeetupComponent" />
      </div>

      <footer class="post-footer">
        <a href="/meetups.html" class="btn btn-outline">&larr; Visi susitikimai</a>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 0;
}

.not-found h1 {
  margin-bottom: 1rem;
}

.not-found p {
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.post {
  max-width: 800px;
}

.post-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.post-title {
  margin-bottom: 0.5rem;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: var(--color-text-muted);
}

.post-location::before {
  content: '📍 ';
}

.post-author::before {
  content: '✍️ ';
}

.post-content {
  margin-bottom: 3rem;
}

.post-footer {
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}
</style>
