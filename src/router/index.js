import { createRouter, createWebHistory } from 'vue-router'
import vCatalog from '@/views/vCatalog.vue'
import v404 from '@/views/v404.vue'

const routes = [
    {
      path: '/',
      component: vCatalog
    },
    {
      path: '/:catchAll(.*)',
      component: v404
    }
]



const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router
  