import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/index.vue'

import { routes as toolsRoutes } from "@/views/tools"



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        name: '哗啦工具箱',
      }
    },
    ...toolsRoutes,
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.name}`
  next()
})

export default router
