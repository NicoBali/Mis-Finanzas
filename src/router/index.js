import { createRouter, createWebHistory } from 'vue-router'

// ✅ Rutas del proyecto anterior
import HomeView from '../views/HomeView.vue'
import Funciones from '../components/PagePrincipal/Funciones.vue'
import Objetivos from '../components/PagePrincipal/Objetivos.vue'

// ✅ Rutas nuevas del sistema de login / dashboard
import RegistroView from '@/views/RegistroView.vue'
import InicioSesionView from '@/views/InicioSesionView.vue'
import DashboardView from '@/views/DashboardView.vue'

const routes = [
  // Página principal del dashboard
  {
    path: '/',
    name: 'DashboardView',
    component: DashboardView
  },

  // ✅ Rutas del proyecto anterior
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

  // ✅ Rutas de autenticación
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
