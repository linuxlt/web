import HomeView from '../views/HomeView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/index.html',
    name: 'home-html',
    component: HomeView
  },
  {
    path: '/news.html',
    name: 'news',
    component: () => import('../views/NewsView.vue')
  },
  {
    path: '/news/:slug.html',
    name: 'news-post',
    component: () => import('../views/NewsPost.vue')
  },
  {
    path: '/meetups.html',
    name: 'meetups',
    component: () => import('../views/MeetupsView.vue')
  },
  {
    path: '/meetups/:slug.html',
    name: 'meetup-post',
    component: () => import('../views/MeetupPost.vue')
  },
  {
    path: '/community.html',
    name: 'community',
    component: () => import('../views/CommunityView.vue')
  },
  {
    path: '/author/:slug.html',
    name: 'author',
    component: () => import('../views/AuthorView.vue')
  }
]
