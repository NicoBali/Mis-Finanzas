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
import MetasAhorro from '@/components/MetaAhorro/MetaAhorro.vue'
import HistorialFinanciero from '@/components/Historial/HistorialFinanciero.vue'
import ConfiguracionMenu from '@/components/ConfiguracionMenu.vue'
import SolicitarEstablecer from '@/components/CambioClave/SolicitarEstablecer.vue'
import RestablecerClave from '@/components/CambioClave/RestablecerClave.vue'
import PageDashboard from '@/components/PagePrincipalDashboard/PageDashboard.vue'

const routes = [
  // Rutas principales / vistas
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

  // Subpáginas / componentes del sitio principal
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
  },
  {
    path: '/metas',
    name: 'MetasAhorro',
    component: MetasAhorro
  },
  {
    path: '/historial',
    name: 'HistorialFinanciero',
    component: HistorialFinanciero
  },
  {
    path: '/configuracion',
    name: 'ConfiguracionMenu',
    component: ConfiguracionMenu
  },
  {
    path: '/solicitud',
    name: 'Solicitud',
    component: SolicitarEstablecer
  },
  {
    path: '/restablecer',
    name: 'Restablecer',
    component: RestablecerClave
  },

  // Ruta del dashboard interno
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: PageDashboard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
