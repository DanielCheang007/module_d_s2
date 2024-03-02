import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../views/games/GamesList.vue')
    },
    {
      path: '/sign_in',
      name: 'sign_in',
      component: () => import('../views/auth/SignIn.vue')
    },
    {
      path: '/sign_up',
      name: 'sign_up',
      component: () => import('../views/auth/SignUp.vue')
    }
  ]
})

export default router
