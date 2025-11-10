<template>
  <div class="app-layout">
    <SlideBarMenu :sidebarOpen="sidebarOpen" />
    <div class="sidebar-overlay" v-if="sidebarOpen && isMobile" @click="toggleSidebar"></div>
    <div class="main-content">
      <button class="menu-toggle" @click="toggleSidebar" v-if="isMobile">
        <i class="bi bi-list"></i>
      </button>
      <div class="dashboard-page text-white p-4">
        <h1 class="mb-4">Dashboard</h1>

        <div class="row">
          <!-- Gastos -->
          <div class="col-md-4 mb-4">
            <div class="card bg-dark h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title" style="color: white;">Gastos</h5>
                <canvas id="gastosChart"></canvas>
              </div>
            </div>
          </div>

          <!-- Ingresos -->
          <div class="col-md-4 mb-4">
            <div class="card bg-dark h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title" style="color: white;">Ingresos</h5>
                <canvas id="ingresosChart"></canvas>
              </div>
            </div>
          </div>

          <!-- Metas -->
          <div class="col-md-4 mb-4">
            <div class="card bg-dark h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title" style="color: white;">Metas</h5>
                <canvas id="metasChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumen general -->
        <div class="card bg-dark shadow-sm mt-4">
          <div class="card-body">
            <h5 class="card-title" style="color: white;">Resumen General</h5>
            <p style="color: white;">Total Gastos: ${{ totalGastos().toLocaleString() }}</p>
            <p style="color: white;">Total Ingresos: ${{ totalIngresos().toLocaleString() }}</p>
            <p style="color: white;">Progreso Metas: {{ progresoMetas() }}%</p>
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

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import SlideBarMenu from '@/components/SlideBarMenu.vue';

Chart.register(...registerables);

// Estado para sidebar móvil
const isMobile = ref(false)
const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

// Datos reales de la API
const ingresos = ref([])
const gastos = ref([])
const metas = ref([])
const usuarioId = Number(localStorage.getItem("usuarioId") || 1)
console.log("Usuario ID actual:", usuarioId)

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

// Cargar metas desde API
const cargarMetas = async () => {
  try {
    const res = await axios.get(`https://localhost:7037/api/Metas/${usuarioId}`)
    metas.value = res.data
  } catch (error) {
    console.error("Error al cargar metas:", error)
    showToast("Error al cargar metas", "bg-warning")
  }
}

// Calcular totales
const totalGastos = () => gastos.value.reduce((sum, g) => sum + g.monto, 0)
const totalIngresos = () => ingresos.value.reduce((sum, i) => sum + i.monto, 0)
const progresoMetas = () => {
  if (metas.value.length === 0) return 0
  const viables = metas.value.filter(m => m.estado === "Viable ✅").length
  return Math.round((viables / metas.value.length) * 100)
}

// Crear gráficos con datos reales
const crearGraficos = () => {
  // Gastos por categoría
  const categoriasGastos = {}
  gastos.value.forEach(g => {
    categoriasGastos[g.categoria] = (categoriasGastos[g.categoria] || 0) + g.monto
  })
  const labelsGastos = Object.keys(categoriasGastos)
  const dataGastos = Object.values(categoriasGastos)

  const ctxGastos = document.getElementById('gastosChart').getContext('2d');
  new Chart(ctxGastos, {
    type: 'pie',
    data: {
      labels: labelsGastos.length > 0 ? labelsGastos : ['Sin datos'],
      datasets: [{
        data: dataGastos.length > 0 ? dataGastos : [1],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40'],
      }]
    }
  });

  // Ingresos individuales (cada ingreso como una línea)
  const labelsIngresos = ingresos.value.map(i => i.descripcion || `Ingreso ${i.id}`)
  const dataIngresos = ingresos.value.map(i => i.monto)

  const ctxIngresos = document.getElementById('ingresosChart').getContext('2d');
  new Chart(ctxIngresos, {
    type: 'bar',
    data: {
      labels: labelsIngresos.length > 0 ? labelsIngresos : ['Sin datos'],
      datasets: [{
        label: 'Ingresos',
        data: dataIngresos.length > 0 ? dataIngresos : [0],
        backgroundColor: '#36a2eb'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });

  // Metas viables vs no viables
  const viables = metas.value.filter(m => m.estado === "Viable ✅").length
  const noViables = metas.value.length - viables

  const ctxMetas = document.getElementById('metasChart').getContext('2d');
  new Chart(ctxMetas, {
    type: 'doughnut',
    data: {
      labels: ['Viables', 'No Viables'],
      datasets: [{
        data: metas.value.length > 0 ? [viables, noViables] : [1, 0],
        backgroundColor: ['#4bc0c0', '#ff6384']
      }]
    }
  });
}

export default {
  name: 'PageDashboard',
  components: {
    SlideBarMenu
  },
  setup() {
    const cambiarSeccion = (seccion) => {
      console.log('Cambiando a sección:', seccion);
      // Aquí puedes agregar lógica para cambiar de sección si es necesario
    };

    onMounted(async () => {
      checkMobile()
      window.addEventListener('resize', checkMobile)

      await Promise.all([cargarIngresos(), cargarGastos(), cargarMetas()])
      crearGraficos()
    });

    onUnmounted(() => {
      window.removeEventListener('resize', checkMobile)
    })

    return {
      isMobile,
      sidebarOpen,
      toggleSidebar,
      cambiarSeccion,
      totalGastos,
      totalIngresos,
      progresoMetas,
      toasts,
      removeToast
    };
  }
}
</script>

<style scoped>
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

/* Contenedor general */
.dashboard-page {
  min-height: 100vh;
  background: linear-gradient(145deg, #071526, #0e2238, #0a1a31);
  padding: 2rem;
}

.card {
  border: none;
}

.card-title {
  font-weight: bold;
  margin-bottom: 1rem;
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

  .dashboard-page {
    padding: 1rem;
  }

  .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 1rem;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .card-body {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .dashboard-page {
    padding: 1rem;
  }
}
</style>
