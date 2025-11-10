<template>
  <div class="app-layout">
    <SlideBarMenu :sidebarOpen="sidebarOpen" />
    <div class="sidebar-overlay" v-if="sidebarOpen && isMobile" @click="toggleSidebar"></div>
    <div class="main-content">
      <button class="menu-toggle" @click="toggleSidebar" v-if="isMobile">
        <i class="bi bi-list"></i>
      </button>
      <div class="split-container">
    <!-- PANEL IZQUIERDO (GRÁFICA ROJA) -->
    <div class="visual-panel d-flex flex-column justify-content-center align-items-center text-white">
      <h1 class="fw-bold mb-3">💸 Control de gastos</h1>
      <p class="text-light mb-5 fs-5">Registra tus gastos y mantén el control de tu presupuesto.</p>

      <div class="stats-card shadow-lg p-4 rounded w-75">
        <h5 class="mb-3 fw-bold text-primary">Resumen rápido</h5>
        <ul class="list-unstyled mb-4">
          <li>
            <i class="bi bi-cash-coin me-2 text-primary"></i> Último gasto:
            <span class="fw-bold text-danger">${{ formatCurrency(ultimoGasto?.monto || 0) }}</span>
          </li>
          <li>
            <i class="bi bi-calendar-event me-2 text-primary"></i> Fecha:
            <span class="fw-bold">{{ ultimoGasto?.fechaRegistro?.substring(0, 10) || "-" }}</span>
          </li>
        </ul>

        <!-- 📊 GRÁFICA ROJA -->
        <div class="chart-placeholder mt-3">
          <div
            v-for="(gasto, index) in gastosGrafica"
            :key="index"
            class="bar red"
            :style="{ height: `${(gasto.monto / maxMonto) * 100}%` }"
          >
            <small class="bar-label">${{ formatCurrency(gasto.monto) }}</small>
          </div>
        </div>
        <small class="text-light">Gastos registrados</small>
      </div>
    </div>

    <!-- PANEL DERECHO -->
    <div class="form-panel d-flex flex-column justify-content-start align-items-center">
      <div class="form-card border-0 shadow-lg bg-white rounded-5 animate-card p-5 mb-4">
        <div class="text-center mb-4">
          <div class="icon-circle mb-3 bg-primary">
            <i class="bi bi-credit-card-2-front"></i>
          </div>
          <h3 class="fw-bold text-primary">Registrar gasto</h3>
          <p class="text-muted">Añade tus gastos y mantén tus finanzas bajo control 💰</p>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="form-floating mb-4">
            <input type="text" v-model="categoria" class="form-control" id="categoria" placeholder="Categoría del gasto" required />
            <label for="categoria"><i class="bi bi-folder2-open me-2"></i> Categoría</label>
          </div>

          <div class="form-floating mb-4">
            <select v-model="tipo" class="form-select" id="tipo" required>
              <option value="fijo">Fijo</option>
              <option value="variable">Variable</option>
              <option value="imprevisto">Imprevisto</option>
            </select>
            <label for="tipo"><i class="bi bi-tags me-2"></i> Tipo de gasto</label>
          </div>

          <div class="form-floating mb-4">
            <input type="number" v-model="monto" class="form-control" id="monto" placeholder="Monto" step="0.01" min="0" required />
            <label for="monto"><i class="bi bi-currency-dollar me-2"></i> Monto</label>
          </div>

          <div class="form-floating mb-4">
            <textarea v-model="descripcion" class="form-control" id="descripcion" placeholder="Descripción del gasto" style="height: 90px"></textarea>
            <label for="descripcion"><i class="bi bi-text-paragraph me-2"></i> Descripción</label>
          </div>

          <div class="form-floating mb-5">
            <input type="date" v-model="fecha" class="form-control" id="fecha" required />
            <label for="fecha"><i class="bi bi-calendar-date me-2"></i> Fecha</label>
          </div>

          <button type="submit" class="btn btn-primary w-100 fw-bold py-3">
            <i class="bi bi-check-circle me-2"></i>
            {{ editando ? "Actualizar gasto" : "Guardar gasto" }}
          </button>
        </form>
      </div>

      <!-- LISTADO DE GASTOS -->
      <div class="gastos-list w-100 mt-3">
        <h5 class="fw-bold text-danger mb-3">📋 Tus gastos</h5>
        <div v-if="gastos.length === 0" class="text-muted text-center">
          No tienes gastos registrados aún
        </div>

        <div
          v-for="gasto in gastos"
          :key="gasto.id"
          class="card gasto-card shadow-sm p-3 mb-2 rounded-4 d-flex flex-row justify-content-between align-items-center"
        >
          <div>
            <strong>{{ gasto.categoria }} ({{ gasto.tipo }})</strong>
            <div class="text-muted">
              💵 ${{ formatCurrency(gasto.monto) }} — 📅 {{ gasto.fechaRegistro.substring(0, 10) }}
            </div>
            <small class="text-secondary">{{ gasto.descripcion }}</small>
          </div>
          <div>
            <button class="btn btn-sm btn-outline-success me-2" @click="editarGasto(gasto)">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="eliminarGasto(gasto.id)">
              <i class="bi bi-trash"></i>
            </button>
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

const categoria = ref("");
const tipo = ref("variable");
const monto = ref("");
const descripcion = ref("");
const fecha = ref("");
const gastos = ref([]);
const editando = ref(false);
const gastoEditadoId = ref(null);
const ultimoGasto = ref(null);
const usuarioId = Number(localStorage.getItem("usuarioId") || 1);

// ✅ Toasts
const toasts = ref([]);
const showToast = (msg, bg = "bg-danger") => {
  toasts.value.push({ msg, bg });
  setTimeout(() => toasts.value.shift(), 3000);
};
const removeToast = (i) => toasts.value.splice(i, 1);

// 📊 Gráfica
const gastosGrafica = computed(() => gastos.value);
const maxMonto = computed(() => Math.max(...gastos.value.map((g) => g.monto), 1));

// 🔢 Formatear número
const formatCurrency = (num) =>
  Number(num).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// 🚀 Cargar gastos
const cargarGastos = async () => {
  const res = await axios.get(`https://localhost:7037/api/Gastos/${usuarioId}`);
  gastos.value = res.data.sort((a, b) => new Date(a.fechaRegistro) - new Date(b.fechaRegistro));
  ultimoGasto.value = gastos.value[gastos.value.length - 1] || null;
};

// Calcular flujo financiero
const calcularFlujo = async () => {
  try {
    await axios.post(`https://localhost:7037/api/Flujo/${usuarioId}`);
    console.log("Flujo financiero calculado automáticamente");
  } catch (error) {
    console.error("Error al calcular flujo financiero:", error);
  }
};

// 💾 Guardar o editar
const handleSubmit = async () => {
  const gasto = {
    usuarioId,
    categoria: categoria.value,
    tipo: tipo.value,
    monto: parseFloat(monto.value),
    descripcion: descripcion.value,
    fechaRegistro: fecha.value,
  };

  try {
    if (editando.value) {
      await axios.put(`https://localhost:7037/api/Gastos/${gastoEditadoId.value}`, gasto);
      showToast("Gasto actualizado ✅", "bg-primary");
      editando.value = false;
      gastoEditadoId.value = null;
    } else {
      await axios.post("https://localhost:7037/api/Gastos", gasto);
      showToast("Gasto guardado con éxito 💸", "bg-danger");
      await calcularFlujo(); // Calcular flujo después de guardar gasto
    }

    categoria.value = "";
    tipo.value = "variable";
    monto.value = "";
    descripcion.value = "";
    fecha.value = "";
    await cargarGastos();
  } catch (error) {
    console.error("❌ Error:", error);
    showToast("Error al guardar el gasto", "bg-warning");
  }
};

// ✏️ Editar gasto
const editarGasto = (gasto) => {
  categoria.value = gasto.categoria;
  tipo.value = gasto.tipo;
  monto.value = gasto.monto;
  descripcion.value = gasto.descripcion;
  fecha.value = gasto.fechaRegistro.substring(0, 10);
  editando.value = true;
  gastoEditadoId.value = gasto.id;
};

// 🗑️ Eliminar gasto
const eliminarGasto = async (id) => {
  try {
    await axios.delete(`https://localhost:7037/api/Gastos/${id}`);
    showToast("Gasto eliminado 🗑️", "bg-danger");
    await cargarGastos();
  } catch (error) {
    console.error(error);
    showToast("Error al eliminar el gasto", "bg-warning");
  }
};

onMounted(() => cargarGastos());
</script>

<style scoped>
.split-container {
  display: flex;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
}

/* === PANEL IZQUIERDO === */
.visual-panel {
  flex: 1;
  background: linear-gradient(135deg, #002b5b, #0a0a0a);
  padding: 3rem;
}

.stats-card {
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  color: #fff;
  transition: transform 0.3s ease;
}
.stats-card:hover {
  transform: translateY(-5px);
}

/* === GRÁFICA ROJA === */
.chart-placeholder {
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
  height: 140px;
  margin-bottom: 0.5rem;
}
.chart-placeholder .bar.red {
  flex: 1;
  background: linear-gradient(180deg, #ff4c4c, #b30000);
  border-radius: 0.25rem;
  transition: height 0.3s ease, transform 0.2s ease;
  position: relative;
}
.chart-placeholder .bar.red:hover {
  transform: scaleY(1.1);
}
.bar-label {
  position: absolute;
  top: -22px;
  font-size: 0.75rem;
  color: #fff;
}

/* === PANEL DERECHO === */
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
}
.icon-circle {
  color: white;
  font-size: 1.8rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #002b5b;
  box-shadow: 0 4px 10px rgba(0, 43, 91, 0.4);
}

/* Botones */
.btn-primary {
  background-color: #002b5b;
  border: none;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}
.btn-primary:hover {
  background-color: #001f3f;
  transform: translateY(-2px);
}

/* Tarjetas de gastos */
.gasto-card {
  background-color: #fff;
  border-left: 5px solid #b30000;
  transition: all 0.2s ease;
}
.gasto-card:hover {
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
