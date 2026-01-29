import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import './assets/main.css'

// Restore .html extension if CF stripped it
if (typeof window !== 'undefined') {
  const path = window.location.pathname
  if (path !== '/' && !path.endsWith('.html') && !path.endsWith('/')) {
    window.history.replaceState(null, '', path + '.html' + window.location.search + window.location.hash)
  }
}

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL
  }
)
