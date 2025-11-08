<template>
  <div class="split-container">
    <!-- PANEL IZQUIERDO (AZUL, CON GRÁFICA ROJA) -->
    <div class="visual-panel d-flex flex-column justify-content-center align-items-center text-white">
      <h1 class="fw-bold mb-3">💸 Control de gastos</h1>
      <p class="text-light mb-5 fs-5">Registra tus gastos y mantén el control de tu presupuesto.</p>

      <div class="stats-card shadow-lg p-4 rounded w-75">
        <h5 class="mb-3 fw-bold text-primary">Resumen rápido</h5>
        <ul class="list-unstyled mb-4">
          <li>
            <i class="bi bi-cash-coin me-2 text-primary"></i> Último gasto:
            <span class="fw-bold text-danger">$150</span>
          </li>
          <li>
            <i class="bi bi-calendar-event me-2 text-primary"></i> Fecha:
            <span class="fw-bold">05/11/2025</span>
          </li>
        </ul>

        <!-- Gráfica -->
        <div class="chart-placeholder mt-3">
          <div class="bar red" style="height: 60%"></div>
          <div class="bar red" style="height: 85%"></div>
          <div class="bar red" style="height: 40%"></div>
          <div class="bar red" style="height: 70%"></div>
          <div class="bar red" style="height: 90%"></div>
        </div>
        <small class="text-light">Gastos de la última semana</small>
      </div>
    </div>

    <!-- PANEL DERECHO (IGUAL QUE ANTES) -->
    <div class="form-panel d-flex justify-content-center align-items-center">
      <div class="form-card border-0 shadow-lg bg-white rounded-5 animate-card p-5">
        <div class="text-center mb-4">
          <div class="icon-circle mb-3 bg-primary">
            <i class="bi bi-credit-card-2-front"></i>
          </div>
          <h3 class="fw-bold text-primary">Registrar gasto</h3>
          <p class="text-muted">Añade tus gastos y mantén tus finanzas bajo control 💰</p>
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- Categoría -->
          <div class="form-floating mb-4">
            <input
              type="text"
              v-model="categoria"
              class="form-control"
              id="categoria"
              placeholder="Categoría del gasto"
              required
            />
            <label for="categoria"><i class="bi bi-folder2-open me-2"></i> Categoría</label>
          </div>

          <!-- Tipo -->
          <div class="form-floating mb-4">
            <select v-model="tipo" class="form-select" id="tipo" required>
              <option value="fijo">Fijo</option>
              <option value="variable">Variable</option>
              <option value="imprevisto">Imprevisto</option>
            </select>
            <label for="tipo"><i class="bi bi-tags me-2"></i> Tipo de gasto</label>
          </div>

          <!-- Monto -->
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

          <!-- Descripción -->
          <div class="form-floating mb-4">
            <textarea
              v-model="descripcion"
              class="form-control"
              id="descripcion"
              placeholder="Descripción del gasto"
              style="height: 90px"
            ></textarea>
            <label for="descripcion"><i class="bi bi-text-paragraph me-2"></i> Descripción</label>
          </div>

          <!-- Fecha -->
          <div class="form-floating mb-5">
            <input type="date" v-model="fecha" class="form-control" id="fecha" required />
            <label for="fecha"><i class="bi bi-calendar-date me-2"></i> Fecha</label>
          </div>

          <!-- Botón -->
          <button type="submit" class="btn btn-primary w-100 fw-bold py-3">
            <i class="bi bi-check-circle me-2"></i> Guardar gasto
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const categoria = ref("");
const tipo = ref("variable");
const monto = ref("");
const descripcion = ref("");
const fecha = ref("");

const handleSubmit = () => {
  const gasto = {
    categoria: categoria.value,
    tipo: tipo.value,
    monto: parseFloat(monto.value),
    descripcion: descripcion.value,
    fecha: fecha.value,
  };
  console.log("Gasto registrado:", gasto);

  categoria.value = "";
  tipo.value = "variable";
  monto.value = "";
  descripcion.value = "";
  fecha.value = "";
};
</script>

<style scoped>
.split-container {
  display: flex;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
}

/* === PANEL IZQUIERDO AZUL === */
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

/* === GRÁFICA EN ROJO === */
.chart-placeholder {
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
  height: 120px;
  margin-bottom: 0.5rem;
}

.chart-placeholder .bar.red {
  flex: 1;
  background: linear-gradient(180deg, #ff4c4c, #b30000);
  border-radius: 0.25rem;
  transition: height 0.3s ease, transform 0.2s ease;
}

.chart-placeholder .bar.red:hover {
  transform: scaleY(1.1);
}

/* === PANEL DERECHO (SIN CAMBIOS) === */
.form-panel {
  flex: 1;
  background-color: #f2f4f7;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
}

.form-card {
  width: 100%;
  max-width: 420px;
  transition: all 0.3s ease;
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

.form-floating .form-control {
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  background-color: #fff;
  color: #333;
  font-size: 0.95rem;
}

.form-floating .form-control:focus {
  border-color: #002b5b;
  box-shadow: 0 0 0 0.25rem rgba(0, 43, 91, 0.2);
}

.btn-primary {
  background-color: #002b5b;
  border: none;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-primary:hover {
  background-color: #001f3f;
  transform: translateY(-2px);
}

/* Animación */
.animate-card {
  animation: slideUp 0.9s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
