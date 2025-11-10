<template>
  <div class="split-container">
    <!-- Panel visual -->
    <div class="visual-panel d-flex flex-column justify-content-center align-items-center text-white">
      <h1 class="fw-bold mb-3">💹 Finanzas claras</h1>
      <p class="text-light mb-5 fs-5">Registra tus ingresos y mantén el control de tu futuro financiero.</p>

      <div class="stats-card shadow-lg p-4 rounded w-75">
        <h5 class="mb-3 fw-bold">Resumen rápido</h5>
        <ul class="list-unstyled mb-4">
          <li><i class="bi bi-cash-coin me-2"></i> Último ingreso: <span class="fw-bold">$2,500</span></li>
          <li><i class="bi bi-calendar-event me-2"></i> Fecha: <span class="fw-bold">05/11/2025</span></li>
        </ul>

        <div class="chart-placeholder mt-3">
          <div class="bar" style="height: 60%"></div>
          <div class="bar" style="height: 85%"></div>
          <div class="bar" style="height: 40%"></div>
          <div class="bar" style="height: 70%"></div>
          <div class="bar" style="height: 90%"></div>
        </div>
        <small class="text-light">Ingresos de la última semana</small>
      </div>
    </div>

    <!-- Panel formulario -->
    <div class="form-panel d-flex justify-content-center align-items-center">
      <div class="form-card border-0 shadow-lg bg-white rounded-5 animate-card p-5">
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
              placeholder="Descripción del ingreso"
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
            <i class="bi bi-check-circle me-2"></i> Guardar ingreso
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const descripcion = ref("");
const monto = ref("");
const fecha = ref("");

// ⚙️ Cambia esto por el ID del usuario autenticado si ya lo manejas
const usuarioId = 1;

const handleSubmit = async () => {
  const ingreso = {
    id: 0,
    usuarioId,
    descripcion: descripcion.value,
    monto: parseFloat(monto.value),
    fechaRegistro: fecha.value,
    usuario: {
      id: usuarioId,
      nombre: "Usuario",
      apellido: "Ejemplo",
      correo: "user@example.com",
      cedula: "123456789",
      contrasena: "1234",
      fechaRegistro: new Date().toISOString(),
      ingresos: [],
      gastos: [],
      flujosMensual: [],
      metasAhorro: [],
      recuperarContraseñas: [],
    },
  };

  try {
    const response = await axios.post("https://localhost:7037/api/Ingresos", ingreso);
    console.log("✅ Ingreso registrado correctamente:", response.data);
    alert("Ingreso guardado con éxito 🎉");

    // Limpiar campos
    descripcion.value = "";
    monto.value = "";
    fecha.value = "";
  } catch (error) {
    console.error("❌ Error al registrar el ingreso:", error);
    alert("Error al registrar el ingreso. Revisa la consola para más detalles.");
  }
};
</script>


<style scoped>
.split-container {
  display: flex;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
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

.chart-placeholder {
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
  height: 120px;
  margin-bottom: 0.5rem;
}

.chart-placeholder .bar {
  flex: 1;
  background: linear-gradient(180deg, #00aaff, #002b5b);
  border-radius: 0.25rem;
  transition: height 0.3s ease, transform 0.2s ease;
}

.chart-placeholder .bar:hover {
  transform: scaleY(1.1);
}

/* === Panel derecho === */
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

/* Campos */
.form-floating .form-control {
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  background-color: #fff;
  color: #333;
  font-size: 0.95rem;
}

.form-floating .form-control:focus {
  border-color: #003366;
  box-shadow: 0 0 0 0.25rem rgba(0, 43, 91, 0.2);
}

/* Botón */
.btn-primary {
  background-color: #003366;
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

/* === RESPONSIVE: uno encima del otro === */
@media (max-width: 992px) {
  .split-container {
    flex-direction: column;
  }

  .visual-panel,
  .form-panel {
    width: 100%;
    min-height: auto;
    padding: 2rem;
  }

  .stats-card {
    width: 100% !important;
  }

  .form-card {
    padding: 2rem;
  }
}
</style>
