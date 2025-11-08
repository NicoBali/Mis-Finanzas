import { createRouter, createWebHistory } from 'vue-router'

// Vistas
import DashboardView from '@/views/DashboardView.vue'
import RegistroView from '@/views/RegistroView.vue'
import InicioSesionView from '@/views/InicioSesionView.vue'
import HomeView from '@/views/HomeView.vue'

// Componentes
import Funciones from '@/components/PagePrincipal/Funciones.vue'
import Objetivos from '@/components/PagePrincipal/Objetivos.vue'
import RegistrarIngreso from '@/components/RegistrarIngreso.vue'
import RegistrarGasto from '@/components/RegistrarGasto.vue'

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
  },
  {
    path: '/login',
    name: 'InicioSesionView',
    component: InicioSesionView
  },
  {
    path: '/principal',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/funciones',
    name: 'PageFunciones',
    component: Funciones
  },
  {
    path: '/objetivos',
    name: 'PageObjetivos',
    component: Objetivos
  },
  {
    path: '/ingreso',
    name: 'RegistrarIngreso',
    component: RegistrarIngreso
  },
  {
    path: '/gasto',
    name: 'RegistrarGasto',
    component: RegistrarGasto
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
