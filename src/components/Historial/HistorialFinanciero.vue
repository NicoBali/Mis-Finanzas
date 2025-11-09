<template>
  <div class="app-layout">
    <SlideBarMenu :sidebarOpen="sidebarOpen" />
    <div class="sidebar-overlay" v-if="sidebarOpen && isMobile" @click="toggleSidebar"></div>
    <div class="main-content">
      <button class="menu-toggle" @click="toggleSidebar" v-if="isMobile">
        <i class="bi bi-list"></i>
      </button>
      <div class="container my-4">
        <h2 class="text-center mb-4" style="color: white;"><i class="bi bi-clock-history me-2"></i>Historial Financiero</h2>

    <!-- Filtro por fechas -->
    <div class="row mb-3">
      <div class="col-12 col-md-4 mb-3 mb-md-0">
        <label class="form-label" style="color: white;">Fecha inicio:</label>
        <input type="date" class="form-control" v-model="fechaInicio">
      </div>
      <div class="col-12 col-md-4 mb-3 mb-md-0">
        <label class="form-label" style="color: white;">Fecha fin:</label>
        <input type="date" class="form-control" v-model="fechaFin">
      </div>
      <div class="col-12 col-md-4 d-flex align-items-end">
        <button class="btn btn-primary w-100" @click="filtrarHistorial">
          Filtrar
        </button>
      </div>
    </div>

    <!-- Tablas de historial -->
    <div class="row">
      <!-- Ingresos -->
      <div class="col-md-6 mb-3">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            Ingresos
          </div>
          <div class="card-body p-0">
            <table class="table table-striped mb-0">
              <thead class="table-light">
                <tr>
                  <th>Descripción</th>
                  <th>Monto ($)</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ingreso in ingresosFiltrados" :key="ingreso.id">
                  <td>{{ ingreso.descripcion || 'Sin descripción' }}</td>
                  <td>{{ ingreso.monto.toLocaleString() }}</td>
                  <td>{{ new Date(ingreso.fecha_registro).toLocaleDateString() }}</td>
                </tr>
                <tr v-if="ingresosFiltrados.length === 0">
                  <td colspan="3" class="text-center">No hay ingresos en este rango</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Gastos -->
      <div class="col-md-6 mb-3">
        <div class="card shadow-sm">
          <div class="card-header bg-danger text-white">
            Gastos
          </div>
          <div class="card-body p-0">
            <table class="table table-striped mb-0">
              <thead class="table-light">
                <tr>
                  <th>Categoría</th>
                  <th>Tipo</th>
                  <th>Monto ($)</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="gasto in gastosFiltrados" :key="gasto.id">
                  <td>{{ gasto.categoria }}</td>
                  <td>{{ gasto.tipo }}</td>
                  <td>{{ gasto.monto.toLocaleString() }}</td>
                  <td>{{ new Date(gasto.fecha_registro).toLocaleDateString() }}</td>
                </tr>
                <tr v-if="gastosFiltrados.length === 0">
                  <td colspan="4" class="text-center">No hay gastos en este rango</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import SlideBarMenu from '../SlideBarMenu.vue'

// Simulamos datos (frontend solo UI)
const ingresos = ref([
  { id: 1, descripcion: 'Sueldo', monto: 1200, fecha_registro: '2025-11-01' },
  { id: 2, descripcion: 'Freelance', monto: 350, fecha_registro: '2025-11-10' },
  { id: 3, descripcion: 'Intereses', monto: 50, fecha_registro: '2025-10-25' },
])

const gastos = ref([
  { id: 1, categoria: 'Alquiler', tipo: 'fijo', monto: 500, fecha_registro: '2025-11-01' },
  { id: 2, categoria: 'Supermercado', tipo: 'variable', monto: 150, fecha_registro: '2025-11-05' },
  { id: 3, categoria: 'Transporte', tipo: 'variable', monto: 60, fecha_registro: '2025-10-28' },
])

// Filtro de fechas
const fechaInicio = ref('')
const fechaFin = ref('')

// Filtramos ingresos
const ingresosFiltrados = computed(() => {
  return ingresos.value.filter(i => {
    const fecha = new Date(i.fecha_registro)
    const inicio = fechaInicio.value ? new Date(fechaInicio.value) : null
    const fin = fechaFin.value ? new Date(fechaFin.value) : null
    return (!inicio || fecha >= inicio) && (!fin || fecha <= fin)
  })
})

// Filtramos gastos
const gastosFiltrados = computed(() => {
  return gastos.value.filter(g => {
    const fecha = new Date(g.fecha_registro)
    const inicio = fechaInicio.value ? new Date(fechaInicio.value) : null
    const fin = fechaFin.value ? new Date(fechaFin.value) : null
    return (!inicio || fecha >= inicio) && (!fin || fecha <= fin)
  })
})

// Botón filtrar
function filtrarHistorial() {
  // Los computed se actualizarán automáticamente
}

// Estado para sidebar móvil
const isMobile = ref(false)
const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Fuente general */
* {
  font-family: 'Poppins', sans-serif;
}

/* Fondo página */
html, body {
  height: 100%;
  margin: 0;
}
body {
  background: linear-gradient(135deg, #002b5b, #1a1a1a);
  color: #f8f9fa;
}

/* Layout */
.app-layout {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding-left: 250px; /* Ancho del sidebar */
}

/* Botón menú móvil */
.menu-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: #111c2e;
  color: #d9e4ff;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.menu-toggle:hover {
  background: #1c2a44;
}

h2 {
  color: #003366;
}
.card-header {
  font-weight: 600;
}
.table td, .table th {
  vertical-align: middle;
}

/* Overlay para cerrar sidebar */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Media Queries */
@media (max-width: 768px) {
  .main-content {
    padding-left: 0;
  }

  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1001;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .menu-toggle {
    display: block;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 1rem;
  }

  .row {
    flex-direction: column;
  }

  .col-md-6 {
    margin-bottom: 1rem;
  }

  .row.mb-3 .col-md-4 {
    margin-bottom: 1rem;
  }

  .row.mb-3 .col-md-4:last-child {
    margin-bottom: 0;
  }
}
</style>
