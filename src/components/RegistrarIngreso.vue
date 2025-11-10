<template>
  <div class="app-layout">
    <SlideBarMenu :sidebarOpen="sidebarOpen" />
    <div class="sidebar-overlay" v-if="sidebarOpen && isMobile" @click="toggleSidebar"></div>
    <div class="main-content">
      <button class="menu-toggle" @click="toggleSidebar" v-if="isMobile">
        <i class="bi bi-list"></i>
      </button>
      <div class="split-container">
    <!-- Panel visual -->
    <div class="visual-panel d-flex flex-column justify-content-center align-items-center text-white">
      <h1 class="fw-bold mb-3">💹 Finanzas claras</h1>
      <p class="text-light mb-5 fs-5">Registra tus ingresos y mantén el control de tu futuro financiero.</p>

      <div class="stats-card shadow-lg p-4 rounded w-75">
        <h5 class="mb-3 fw-bold">Resumen rápido</h5>
        <ul class="list-unstyled mb-4">
          <li>
            <i class="bi bi-cash-coin me-2"></i> Último ingreso:
            <span class="fw-bold">${{ formatCurrency(ultimoIngreso?.monto || 0) }}</span>
          </li>
          <li>
            <i class="bi bi-calendar-event me-2"></i> Fecha:
            <span class="fw-bold">{{ ultimoIngreso?.fechaRegistro?.substring(0, 10) || "-" }}</span>
          </li>
        </ul>

        <!-- 📊 Gráfico dinámico -->
        <div class="chart-placeholder mt-3">
          <div
            v-for="(ing, index) in ingresosGrafica"
            :key="index"
            class="bar"
            :style="{ height: `${(ing.monto / maxMonto) * 100}%` }"
          >
            <small class="bar-label">${{ formatCurrency(ing.monto) }}</small>
          </div>
        </div>
        <small class="text-light">Ingresos registrados</small>
      </div>
    </div>

    <!-- Panel formulario -->
    <div class="form-panel d-flex flex-column justify-content-start align-items-center">
      <div class="form-card border-0 shadow-lg bg-white rounded-5 animate-card p-5 mb-4">
        <div class="text-center mb-4">
          <div class="icon-circle mb-3">
            <i class="bi bi-wallet2"></i>
          </div>
          <h3 class="fw-bold text-primary">Registrar ingreso</h3>
          <p class="text-muted">Añade tus ingresos fácilmente y mantén tu balance actualizado ⚡</p>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="form-floating mb-4">
            <input
              type="text"
              v-model="descripcion"
              class="form-control"
              id="descripcion"
              placeholder="Descripción"
              required
            />
            <label for="descripcion"><i class="bi bi-text-paragraph me-2"></i> Descripción</label>
          </div>

          <div class="form-floating mb-4">
            <input
              type="number"
              v-model="monto"
              class="form-control"
              id="monto"
              placeholder="Monto"
              step="0.01"
              min="0"
              required
            />
            <label for="monto"><i class="bi bi-currency-dollar me-2"></i> Monto</label>
          </div>

          <div class="form-floating mb-5">
            <input type="date" v-model="fecha" class="form-control" id="fecha" required />
            <label for="fecha"><i class="bi bi-calendar-date me-2"></i> Fecha</label>
          </div>

          <button type="submit" class="btn btn-primary w-100 fw-bold py-3">
            <i class="bi bi-check-circle me-2"></i>
            {{ editando ? "Actualizar ingreso" : "Guardar ingreso" }}
          </button>
        </form>
      </div>

      <!-- Listado de ingresos -->
      <div class="ingresos-list w-100 mt-3">
        <h5 class="fw-bold text-primary mb-3">📋 Tus ingresos</h5>
        <div v-if="ingresos.length === 0" class="text-muted text-center">
          No tienes ingresos registrados aún
        </div>

        <div
          v-for="ing in ingresos"
          :key="ing.id"
          class="card ingreso-card shadow-sm p-3 mb-2 rounded-4 d-flex flex-row justify-content-between align-items-center"
        >
          <div>
            <strong>{{ ing.descripcion }}</strong>
            <div class="text-muted">
              💵 ${{ formatCurrency(ing.monto) }} — 📅 {{ ing.fechaRegistro.substring(0, 10) }}
            </div>
          </div>
          <div>
            <button class="btn btn-sm btn-outline-success me-2" @click="editarIngreso(ing)">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="eliminarIngreso(ing.id)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toasts -->
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
import { ref, onMounted, onUnmounted, computed } from "vue";
import axios from "axios";
import SlideBarMenu from "./SlideBarMenu.vue";

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

const descripcion = ref("");
const monto = ref("");
const fecha = ref("");
const ingresos = ref([]);
const editando = ref(false);
const ingresoEditadoId = ref(null);
const ultimoIngreso = ref(null);
const usuarioId = Number(localStorage.getItem("usuarioId") || 1);

// Toasts Bootstrap
const toasts = ref([]);
const showToast = (msg, bg = "bg-success") => {
  toasts.value.push({ msg, bg });
  setTimeout(() => toasts.value.shift(), 3000);
};
const removeToast = (i) => toasts.value.splice(i, 1);

// 📈 Gráfica dinámica: muestra TODOS los ingresos
const ingresosGrafica = computed(() => ingresos.value);
const maxMonto = computed(() => Math.max(...ingresos.value.map((i) => i.monto), 1));

// 🔢 Formatear número con comas
const formatCurrency = (num) => {
  return Number(num).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Cargar ingresos
const cargarIngresos = async () => {
  const res = await axios.get(`https://localhost:7037/api/Ingresos/${usuarioId}`);
  ingresos.value = res.data.sort((a, b) => new Date(a.fechaRegistro) - new Date(b.fechaRegistro)); // Ordena por fecha
  ultimoIngreso.value = ingresos.value[ingresos.value.length - 1] || null;
};

// Calcular flujo financiero
// eslint-disable-next-line no-unused-vars
const calcularFlujo = async () => {
  try {
    await axios.post(`https://localhost:7037/api/Flujo/${usuarioId}`);
    console.log("Flujo financiero calculado automáticamente");
  } catch (error) {
    console.error("Error al calcular flujo financiero:", error);
  }
};

// Guardar o editar ingreso
const handleSubmit = async () => {
  const ingreso = {
    usuarioId,
    descripcion: descripcion.value,
    monto: parseFloat(monto.value),
    fechaRegistro: fecha.value,
  };

  try {
    if (editando.value) {
      await axios.put(`https://localhost:7037/api/Ingresos/${ingresoEditadoId.value}`, ingreso);
      showToast("Ingreso actualizado ✅", "bg-primary");
      editando.value = false;
      ingresoEditadoId.value = null;
    } else {
      await axios.post("https://localhost:7037/api/Ingresos", ingreso);
      showToast("Ingreso guardado con éxito 🎉", "bg-success");
      await calcularFlujo(); // Calcular flujo después de guardar ingreso
    }

    descripcion.value = "";
    monto.value = "";
    fecha.value = "";
    await cargarIngresos();
  } catch (error) {
    console.error("❌ Error:", error);
    showToast("Error al guardar el ingreso", "bg-danger");
  }
};

// Editar ingreso
const editarIngreso = (ing) => {
  descripcion.value = ing.descripcion;
  monto.value = ing.monto;
  fecha.value = ing.fechaRegistro.substring(0, 10);
  editando.value = true;
  ingresoEditadoId.value = ing.id;
};

// Eliminar ingreso (sin confirm)
const eliminarIngreso = async (id) => {
  try {
    await axios.delete(`https://localhost:7037/api/Ingresos/${id}`);
    showToast("Ingreso eliminado 🗑️", "bg-danger");
    await cargarIngresos();
  } catch (error) {
    console.error(error);
    showToast("Error al eliminar el ingreso", "bg-warning");
  }
};

onMounted(() => {
  cargarIngresos();
});
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.menu-toggle {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 51, 102, 0.3);
  transition: all 0.3s ease;
}

.menu-toggle:hover {
  background-color: #001f3f;
  transform: scale(1.1);
}

.split-container {
  display: flex;
  flex: 1;
}

/* === Panel izquierdo === */
.visual-panel {
  flex: 1;
  background: linear-gradient(135deg, #002b5b, #1a1a1a);
  padding: 3rem;
}

.stats-card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  color: #fff;
  transition: transform 0.3s ease;
}
.stats-card:hover {
  transform: translateY(-5px);
}

/* === Gráfica dinámica === */
.chart-placeholder {
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
  height: 140px;
  margin-bottom: 0.5rem;
}
.chart-placeholder .bar {
  flex: 1;
  background: linear-gradient(180deg, #00aaff, #002b5b);
  border-radius: 0.25rem;
  transition: height 0.3s ease, transform 0.2s ease;
  position: relative;
}
.chart-placeholder .bar:hover {
  transform: scaleY(1.1);
}
.bar-label {
  position: absolute;
  top: -22px;
  font-size: 0.75rem;
  color: #fff;
}

/* === Panel derecho === */
.form-panel {
  flex: 1;
  background-color: #f2f4f7;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 4rem;
}
.form-card {
  width: 100%;
  max-width: 420px;
  transition: all 0.3s ease;
}
.icon-circle {
  background: #003366;
  color: white;
  font-size: 1.8rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 51, 102, 0.3);
}
.btn-primary {
  background-color: #003366;
  border: none;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}
.btn-primary:hover {
  background-color: #001f3f;
  transform: translateY(-2px);
}

/* Tarjetas de ingresos */
.ingreso-card {
  background-color: #fff;
  border-left: 5px solid #002b5b;
  transition: all 0.2s ease;
}
.ingreso-card:hover {
  transform: translateY(-3px);
}

/* Toasts */
.toast-container {
  z-index: 1055;
}
.toast {
  opacity: 0.95;
  border-radius: 10px;
}

/* Responsivo */
@media (max-width: 992px) {
  .split-container {
    flex-direction: column;
  }
  .visual-panel,
  .form-panel {
    width: 100%;
    padding: 2rem;
  }
}
</style>
