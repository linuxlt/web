<script setup>
import { computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import HomeView from './views/HomeView.vue'
import NewsView from './views/NewsView.vue'
import NewsPost from './views/NewsPost.vue'
import MeetupsView from './views/MeetupsView.vue'
import MeetupPost from './views/MeetupPost.vue'
import CommunityView from './views/CommunityView.vue'
import AuthorView from './views/AuthorView.vue'

// Get current path from URL
const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'

// Determine which component to show based on pathname
const currentView = computed(() => {
  if (pathname === '/' || pathname === '/index.html') {
    return { component: HomeView, props: {} }
  }
  if (pathname === '/news.html') {
    return { component: NewsView, props: {} }
  }
  if (pathname.startsWith('/news/') && pathname.endsWith('.html')) {
    const slug = pathname.replace('/news/', '').replace('.html', '')
    return { component: NewsPost, props: { slug } }
  }
  if (pathname === '/meetups.html') {
    return { component: MeetupsView, props: {} }
  }
  if (pathname.startsWith('/meetups/') && pathname.endsWith('.html')) {
    const slug = pathname.replace('/meetups/', '').replace('.html', '')
    return { component: MeetupPost, props: { slug } }
  }
  if (pathname === '/community.html') {
    return { component: CommunityView, props: {} }
  }
  if (pathname.startsWith('/author/') && pathname.endsWith('.html')) {
    const slug = pathname.replace('/author/', '').replace('.html', '')
    return { component: AuthorView, props: { slug } }
  }
  // Default to home
  return { component: HomeView, props: {} }
})
</script>

<template>
  <div class="app">
    <AppHeader />
    <main class="main-content">
      <component :is="currentView.component" v-bind="currentView.props" />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
