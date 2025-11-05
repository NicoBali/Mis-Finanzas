import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Funciones from '../components/PagePrincipal/Funciones.vue'
import Objetivos from '../components/PagePrincipal/Objetivos.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/funciones',
    name: 'funciones',
    component: Funciones
  },
  {
    path: '/objetivos',
    name: 'objetivos',
    component: Objetivos
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
