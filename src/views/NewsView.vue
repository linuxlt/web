<script setup>
import NewsCard from '../components/NewsCard.vue'

const modules = import.meta.glob('../content/news/*.md', { eager: true })

const allNews = Object.entries(modules)
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
</script>

<template>
  <div class="news-view">
    <header class="page-header">
      <h1>Naujienos</h1>
      <p class="page-description">Straipsniai ir naujienos iš Linux pasaulio</p>
    </header>

    <div class="news-list">
      <NewsCard
        v-for="post in allNews"
        :key="post.slug"
        :title="post.title"
        :date="post.date"
        :excerpt="post.excerpt"
        :slug="post.slug"
        :author="post.author"
        :author-slug="post.authorSlug"
      />
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

.news-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
