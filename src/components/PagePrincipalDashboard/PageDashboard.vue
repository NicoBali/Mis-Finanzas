<template>
  <div class="dashboard-container">
    <SlideBarMenu :sidebarOpen="sidebarOpen" @change-section="cambiarSeccion" />
    <div class="main-content" :class="{ 'sidebar-open': sidebarOpen }">
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
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';
import SlideBarMenu from '@/components/SlideBarMenu.vue';

Chart.register(...registerables);

export default {
  name: 'PageDashboard',
  components: {
    SlideBarMenu
  },
  setup() {
    const sidebarOpen = ref(false);

    const cambiarSeccion = (seccion) => {
      console.log('Cambiando a sección:', seccion);
      // Aquí puedes agregar lógica para cambiar de sección si es necesario
    };

    onMounted(() => {
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

    return {
      sidebarOpen,
      cambiarSeccion
    };
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background: #111c2e;
  padding: 2rem 1rem;
  color: #d9e4ff;
  box-shadow: 8px 0px 20px rgba(0,0,0,0.3);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}

.main-content {
  flex: 1;
  margin-left: 0;
  transition: margin-left 0.3s ease;
}

.main-content.sidebar-open {
  margin-left: 250px;
}

.dashboard-page {
  min-height: 100vh;
  background: linear-gradient(145deg, #071526, #0e2238, #0a1a31);
}

.card {
  border: none;
}

.card-title {
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
