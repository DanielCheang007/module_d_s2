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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../views/games/GamesList.vue')
    },
    {
      path: '/game/:slug',
      name: 'game',
      component: () => import('../views/games/GameView.vue')
    },
    {
      path: '/game/:slug/manage',
      name: 'manage_game',
      component: () => import('../views/games/ManageGame.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/auth/UserProfile.vue')
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
