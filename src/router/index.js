import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/addNumber',
    name: 'AddNumber',
    component: () => import('../views/AddNumber.vue')
  },
  {
    path: '/Numbers/:id',
    name: 'EditNumber',
    component: () => import('../views/EditNumber.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
