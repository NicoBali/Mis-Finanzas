import { createRouter, createWebHistory } from 'vue-router'
import RegistroView from '@/views/RegistroView.vue'
import InicioSesionView from '@/views/InicioSesionView.vue'
import DashboardView from '@/views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'DashboardView',
    component: DashboardView
  },
  {
    path: '/registro',
    name: 'RegistroView',
    component: RegistroView
  }, {
    path: '/login',
    name: 'InicioSesionView',
    component: InicioSesionView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
