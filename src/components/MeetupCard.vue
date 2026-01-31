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
  location: {
    type: String,
    required: true
  },
  description: {
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
  },
  isPast: {
    type: Boolean,
    default: false
  }
})

const monthsLt = ['Sau', 'Vas', 'Kov', 'Bal', 'Geg', 'Bir', 'Lie', 'Rgp', 'Rgs', 'Spa', 'Lap', 'Gru']

const getShortMonth = (dateStr) => {
  return monthsLt[new Date(dateStr).getMonth()]
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
</script>

<template>
  <article class="meetup-card card" :class="{ 'is-past': isPast }">
    <div class="meetup-date-badge">
      <span class="meetup-day">{{ new Date(date).getDate() }}</span>
      <span class="meetup-month">{{ getShortMonth(date) }}</span>
    </div>
    <div class="meetup-content">
      <h3 class="meetup-title">
        <RouterLink :to="`/meetups/${slug}.html`">{{ title }}</RouterLink>
      </h3>
      <div class="meetup-meta">
        <span class="meetup-time">{{ formatDate(date) }}</span>
        <span class="meetup-location">{{ location }}</span>
        <span v-if="author" class="meetup-author">
          <RouterLink :to="`/author/${authorSlug}.html`">{{ author }}</RouterLink>
        </span>
      </div>
      <p class="meetup-description">{{ description }}</p>
      <span v-if="isPast" class="meetup-badge past">Praėjęs</span>
      <span v-else class="meetup-badge upcoming">Artėjantis</span>
    </div>
  </article>
</template>

<style scoped>
.meetup-card {
  display: flex;
  gap: 1.5rem;
}

.meetup-card.is-past {
  opacity: 0.7;
}

.meetup-date-badge {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: var(--color-primary);
  color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.is-past .meetup-date-badge {
  background: var(--color-text-muted);
}

.meetup-day {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.meetup-month {
  font-size: 0.75rem;
  text-transform: uppercase;
}

.meetup-content {
  flex: 1;
}

.meetup-title {
  margin-bottom: 0.5rem;
}

.meetup-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.meetup-location::before {
  content: '📍 ';
}

.meetup-author::before {
  content: '✍️ ';
}

.meetup-description {
  margin-bottom: 1rem;
}

.meetup-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.meetup-badge.upcoming {
  background: #dcfce7;
  color: #166534;
}

.meetup-badge.past {
  background: var(--color-background-alt);
  color: var(--color-text-muted);
}

@media (max-width: 480px) {
  .meetup-card {
    flex-direction: column;
    gap: 1rem;
  }

  .meetup-date-badge {
    width: 100%;
    height: auto;
    padding: 0.75rem;
    flex-direction: row;
    gap: 0.5rem;
  }

  .meetup-day {
    font-size: 1.25rem;
  }
}
</style>
