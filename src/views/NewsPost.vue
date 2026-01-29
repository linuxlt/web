<script setup>
import { ref, onMounted, watch, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const modules = import.meta.glob('../content/news/*.md', { eager: true })

const posts = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => {
    const slug = path.split('/').pop().replace('.md', '')
    const author = module.author || module.frontmatter?.author || ''
    return [slug, {
      title: module.title || module.frontmatter?.title || 'Untitled',
      date: module.date || module.frontmatter?.date || '',
      author,
      authorSlug: author.toLowerCase().replace(/\s+/g, '-'),
      component: module.default
    }]
  })
)

const post = ref(null)
const PostComponent = shallowRef(null)
const notFound = ref(false)

const loadPost = () => {
  const slug = route.params.slug
  if (posts[slug]) {
    post.value = posts[slug]
    PostComponent.value = posts[slug].component
    notFound.value = false
  } else {
    post.value = null
    PostComponent.value = null
    notFound.value = true
  }
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('lt-LT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(loadPost)
watch(() => route.params.slug, loadPost)
</script>

<template>
  <div class="news-post">
    <div v-if="notFound" class="not-found">
      <h1>Straipsnis nerastas</h1>
      <p>Atsiprašome, tačiau ieškomas straipsnis neegzistuoja.</p>
      <RouterLink to="/news.html" class="btn btn-primary">Grįžti į naujienas</RouterLink>
    </div>

    <article v-else-if="post" class="post">
      <header class="post-header">
        <RouterLink to="/news.html" class="back-link">&larr; Grįžti į naujienas</RouterLink>
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <time class="post-date">{{ formatDate(post.date) }}</time>
          <span v-if="post.author" class="post-author">
            <RouterLink :to="`/author/${post.authorSlug}.html`">{{ post.author }}</RouterLink>
          </span>
        </div>
      </header>

      <div class="post-content markdown-content">
          <component :is="PostComponent" />
        </div>

      <footer class="post-footer">
        <RouterLink to="/news.html" class="btn btn-outline">&larr; Visos naujienos</RouterLink>
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
