<template>
  <div class="dashboard-layout">
    <!-- Sidebar siempre visible -->
    <SlideBarMenu @change-section="currentSection = $event" />

    <!-- Contenido dinámico -->
    <div class="dashboard-content">
      <component :is="currentSection" />
    </div>
  </div>
</template>

<script>
import SlideBarMenu from '@/components/SlideBarMenu.vue'
/* import DashboardMain from '@/components/DashboardMain.vue' */
import RegistrarIngreso from '@/components/RegistrarIngreso.vue'
import RegistrarGasto from '@/components/RegistrarGasto.vue'
/* import RegistrarMeta from '@/components/RegistrarMeta.vue'
import HistorialFinanciero from '@/components/HistorialFinanciero.vue' */
import ConfiguracionMenu from '@/components/ConfiguracionMenu.vue'

export default {
  name: 'DashboardView',
  components: {
    SlideBarMenu,
/*     DashboardMain, */
    RegistrarIngreso,
    RegistrarGasto,
    ConfiguracionMenu
   /*  RegistrarMeta,
    HistorialFinanciero */
  },
  data() {
    return {
      currentSection: 'DashboardMain' // Sección por defecto
    }
  }
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  background-color: #f5f7fa;
}

/* Contenedor derecho donde cambia el contenido */
.dashboard-content {
  flex: 1;
  margin-left: 250px; /* ancho del sidebar */
  padding: 2rem;
  overflow-y: auto;
}
</style>
