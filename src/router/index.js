import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Funciones from '../components/PagePrincipal/Funciones.vue'
import Objetivos from '../components/PagePrincipal/Objetivos.vue'
import RegistroView from '@/views/RegistroView.vue'
import InicioSesionView from '@/views/InicioSesionView.vue'
import DashboardView from '@/views/DashboardView.vue'


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
  {
    path: '/',
    name: 'DashboardView',
    component: DashboardView
  },
  {
    path: '/registro',
    name: 'RegistroView',
    component: RegistroView
  },
  {
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
