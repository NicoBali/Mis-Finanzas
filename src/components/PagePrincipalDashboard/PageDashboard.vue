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
            <p style="color: white;">Total Gastos: $1,200</p>
            <p style="color: white;">Total Ingresos: $3,500</p>
            <p style="color: white;">Progreso Metas: 60%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';
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

    onMounted(() => {
      checkMobile()
      window.addEventListener('resize', checkMobile)

      // Gastos
      const ctxGastos = document.getElementById('gastosChart').getContext('2d');
      new Chart(ctxGastos, {
        type: 'pie',
        data: {
          labels: ['Alquiler', 'Comida', 'Transporte', 'Otros'],
          datasets: [{
            data: [400, 300, 200, 300],
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
          }]
        }
      });

      // Ingresos
      const ctxIngresos = document.getElementById('ingresosChart').getContext('2d');
      new Chart(ctxIngresos, {
        type: 'bar',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
          datasets: [{
            label: 'Ingresos Mensuales',
            data: [800, 1200, 1000, 1500],
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

      // Metas
      const ctxMetas = document.getElementById('metasChart').getContext('2d');
      new Chart(ctxMetas, {
        type: 'doughnut',
        data: {
          labels: ['Viables', 'No Viables'],
          datasets: [{
            data: [3, 2],
            backgroundColor: ['#4bc0c0', '#ff6384']
          }]
        }
      });
    });

    onUnmounted(() => {
      window.removeEventListener('resize', checkMobile)
    })

    return {
      isMobile,
      sidebarOpen,
      toggleSidebar,
      cambiarSeccion
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
