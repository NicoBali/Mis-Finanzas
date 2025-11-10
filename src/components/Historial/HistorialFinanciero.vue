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
                  <td>{{ new Date(ingreso.fechaRegistro).toLocaleDateString() }}</td>
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
                  <td>{{ new Date(gasto.fechaRegistro).toLocaleDateString() }}</td>
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

    <!-- TOASTS -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        v-for="(toast, index) in toasts"
        :key="index"
        class="toast align-items-center text-white border-0 show"
        :class="toast.bg"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">{{ toast.msg }}</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            @click="removeToast(index)"
          ></button>
        </div>
      </div>
    </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import SlideBarMenu from '../SlideBarMenu.vue'

// Datos reales de la API
const ingresos = ref([])
const gastos = ref([])
const usuarioId = Number(localStorage.getItem("usuarioId") || 1)

// Toasts para feedback
const toasts = ref([])
const showToast = (msg, bg = "bg-danger") => {
  toasts.value.push({ msg, bg })
  setTimeout(() => toasts.value.shift(), 3000)
}
const removeToast = (i) => toasts.value.splice(i, 1)

// Cargar ingresos desde API
const cargarIngresos = async () => {
  try {
    const res = await axios.get(`https://localhost:7037/api/Ingresos/${usuarioId}`)
    ingresos.value = res.data.sort((a, b) => new Date(a.fechaRegistro) - new Date(b.fechaRegistro))
  } catch (error) {
    console.error("Error al cargar ingresos:", error)
    showToast("Error al cargar ingresos", "bg-warning")
  }
}

// Cargar gastos desde API
const cargarGastos = async () => {
  try {
    const res = await axios.get(`https://localhost:7037/api/Gastos/${usuarioId}`)
    gastos.value = res.data.sort((a, b) => new Date(a.fechaRegistro) - new Date(b.fechaRegistro))
  } catch (error) {
    console.error("Error al cargar gastos:", error)
    showToast("Error al cargar gastos", "bg-warning")
  }
}

// Filtro de fechas
const fechaInicio = ref('')
const fechaFin = ref('')

// Filtramos ingresos
const ingresosFiltrados = computed(() => {
  return ingresos.value.filter(i => {
    const fecha = new Date(i.fechaRegistro)
    const inicio = fechaInicio.value ? new Date(fechaInicio.value) : null
    const fin = fechaFin.value ? new Date(fechaFin.value) : null
    return (!inicio || fecha >= inicio) && (!fin || fecha <= fin)
  })
})

// Filtramos gastos
const gastosFiltrados = computed(() => {
  return gastos.value.filter(g => {
    const fecha = new Date(g.fechaRegistro)
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
  cargarIngresos()
  cargarGastos()
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
