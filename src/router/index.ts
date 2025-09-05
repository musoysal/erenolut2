import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import EventsView from '../views/EventsView.vue'
import BlogView from '../views/BlogView.vue'
import BlogDetailView from '../views/BlogDetailView.vue'
import NewsView from '../views/NewsView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/hakkimizda',
      name: 'about',
      component: AboutView
    },
    {
      path: '/etkinlikler',
      name: 'events',
      component: EventsView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/blog/:id',
      name: 'blog-detail',
      component: BlogDetailView
    },
    {
      path: '/duyurular',
      name: 'news',
      component: NewsView
    },
    {
      path: '/iletisim',
      name: 'contact',
      component: ContactView
    }
  ]
})

export default router
