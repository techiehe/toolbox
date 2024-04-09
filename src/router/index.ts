import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/index.vue'

import views from  "@/views/autoExport"

console.log(views());

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/crypto/aes',
      name: 'crypto-aes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/crypto/Aes.vue')
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/qrcode/index.vue')
    }
  ]
})

export default router
