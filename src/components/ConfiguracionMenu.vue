<template>
  <div class="config-container">
    <div class="config-card shadow-lg rounded-4 p-5">
      <h2 class="fw-bold text-primary mb-4">
        ⚙️ Configuración de usuario
      </h2>

      <!-- PERFIL DE USUARIO -->
      <section class="config-section mb-5">
        <h5 class="section-title text-primary mb-3">
          👤 Perfil del usuario
        </h5>
        <div class="row g-3">
          <div class="col-md-6">
            <div class="form-floating">
              <input
                type="text"
                v-model="nombre"
                class="form-control"
                id="nombre"
                placeholder="Tu nombre"
              />
              <label for="nombre">Nombre</label>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-floating">
              <input
                type="email"
                v-model="correo"
                class="form-control"
                id="correo"
                placeholder="Correo electrónico"
              />
              <label for="correo">Correo electrónico</label>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-floating">
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="password"
                placeholder="Contraseña"
              />
              <label for="password">Contraseña</label>
            </div>
          </div>

          <div class="col-md-6 d-flex align-items-center">
            <button class="btn btn-outline-primary w-100 fw-semibold py-3">
              🔑 Cambiar contraseña
            </button>
          </div>
        </div>
      </section>

      <!-- MONEDA PREDETERMINADA -->
      <section class="config-section mb-5">
        <h5 class="section-title text-primary mb-3">
          💰 Moneda predeterminada
        </h5>
        <div class="form-floating w-50">
          <select v-model="moneda" class="form-select" id="moneda">
            <option value="COP">🇨🇴 COP (Peso colombiano)</option>
            <option value="USD">🇺🇸 USD (Dólar estadounidense)</option>
            <option value="EUR">🇪🇺 EUR (Euro)</option>
          </select>
          <label for="moneda">Selecciona tu moneda</label>
        </div>
      </section>

      <!-- MENSAJES MOTIVACIONALES -->
      <section class="config-section mb-5">
        <h5 class="section-title text-primary mb-3">
          💬 Mensajes motivacionales
        </h5>

        <div class="form-floating">
          <select v-model="mensaje" class="form-select" id="mensaje">
            <option>¡Vas bien con tus finanzas! 💪</option>
            <option>Recuerda registrar tus gastos diarios 🧾</option>
            <option>Pequeños pasos crean grandes logros 🚀</option>
            <option>Ahorrar hoy, disfrutar mañana 🌅</option>
          </select>
          <label for="mensaje">Selecciona un mensaje</label>
        </div>

        <div class="preview-message mt-4 p-4 rounded text-center fw-semibold">
          {{ mensaje }}
        </div>
      </section>

      <!-- BOTÓN GUARDAR -->
      <div class="text-end">
        <button class="btn btn-primary fw-bold px-5 py-3" @click="guardarConfiguracion">
          💾 Guardar cambios
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const nombre = ref("Nicolás Palacio");
const correo = ref("usuario@correo.com");
const password = ref("");
const moneda = ref("COP");
const mensaje = ref("¡Vas bien con tus finanzas! 💪");

const guardarConfiguracion = () => {
  const config = {
    nombre: nombre.value,
    correo: correo.value,
    moneda: moneda.value,
    mensaje: mensaje.value,
  };
  console.log("Configuración guardada:", config);
  alert("✅ Configuración guardada correctamente");
};
</script>

<style scoped>
.config-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #f2f4f7;
  padding: 3rem;
  font-family: "Poppins", sans-serif;
}

.config-card {
  width: 100%;
  max-width: 900px;
  background-color: #ffffff;
  border-left: 8px solid #002b5b;
}

.section-title {
  font-weight: 600;
  border-bottom: 2px solid #002b5b;
  padding-bottom: 0.5rem;
  display: inline-block;
}

.form-floating .form-control,
.form-floating .form-select {
  border-radius: 0.75rem;
  border: 1px solid #ccc;
  color: #333;
}

.form-floating .form-control:focus,
.form-floating .form-select:focus {
  border-color: #002b5b;
  box-shadow: 0 0 0 0.25rem rgba(0, 43, 91, 0.2);
}

.btn-outline-primary {
  border: 2px solid #002b5b;
  color: #002b5b;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background-color: #002b5b;
  color: white;
}

.preview-message {
  background-color: #002b5b;
  color: white;
  font-size: 1rem;
  letter-spacing: 0.5px;
  box-shadow: 0 3px 10px rgba(0, 43, 91, 0.3);
}
</style>
