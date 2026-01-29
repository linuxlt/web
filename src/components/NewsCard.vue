<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: ''
  },
  authorSlug: {
    type: String,
    default: ''
  }
})

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('lt-LT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <article class="news-card card">
    <div class="news-card-content">
      <div class="news-meta">
        <time class="news-date">{{ formatDate(date) }}</time>
        <span v-if="author" class="news-author">
          <a :href="`/author/${authorSlug}.html`">{{ author }}</a>
        </span>
      </div>
      <h3 class="news-title">
        <a :href="`/news/${slug}.html`">{{ title }}</a>
      </h3>
      <p class="news-excerpt">{{ excerpt }}</p>
      <a :href="`/news/${slug}.html`" class="news-link">
        Skaityti daugiau &rarr;
      </a>
    </div>
  </article>
</template>

<style scoped>
.news-card {
  display: flex;
  flex-direction: column;
}

.news-card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.news-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.news-author::before {
  content: '• ';
}

.news-title {
  margin-bottom: 0.75rem;
}

.news-title a {
  color: var(--color-text);
}

.news-title a:hover {
  color: var(--color-primary);
}

.news-excerpt {
  color: var(--color-text-muted);
  flex: 1;
  margin-bottom: 1rem;
}

.news-link {
  font-weight: 500;
}
</style>
