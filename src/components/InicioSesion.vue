<template>
  <div class="login-wrapper d-flex justify-content-center align-items-center">
    <div class="login-card animate__animated animate__fadeInDown">

      <h2 class="text-center fw-bold mb-4 titulo">Iniciar sesión</h2>

      <form @submit.prevent="iniciarSesion">

        <div class="mb-3 input-group">
          <span class="input-group-text"><i class="bi bi-envelope"></i></span>
          <input type="email" class="form-control" placeholder="Correo electrónico" v-model="credenciales.correo" required>
        </div>

        <div class="mb-4 input-group">
          <span class="input-group-text"><i class="bi bi-lock"></i></span>
          <input type="password" class="form-control" placeholder="Contraseña" v-model="credenciales.contrasena" required>
        </div>

        <button type="submit" class="btn btn-primary w-100 fw-semibold login-btn">
          <i class="bi bi-box-arrow-in-right"></i> Ingresar
        </button>
      </form>

      <p class="text-center mt-3 text-light small">
        ¿No tienes cuenta? <router-link to="/registro" class="link-light text-decoration-none fw-bold">Regístrate</router-link>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const credenciales = ref({
  correo: "",
  contrasena: ""
})

const iniciarSesion = () => {
  if (!credenciales.value.correo || !credenciales.value.contrasena) {
    alert("❌ Ingresa tu correo y contraseña.")
    return
  }

  console.log("🔐 Usuario inició sesión:", credenciales.value)
  alert(`✅ Bienvenido nuevamente!`)
}
</script>

<style scoped>
/* Fondo igual al registro */
.login-wrapper {
  min-height: 100vh;
  background: linear-gradient(145deg, #071526, #0e2238, #0a1a31);
  padding: 2rem;
}

/* Tarjeta con efecto glass */
.login-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
}

/* Título */
.titulo {
  color: #ffffff;
  letter-spacing: 1px;
  font-size: 1.7rem;
}

/* Inputs */
.input-group-text {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #cbd5e1;
}

.form-control {
  background: rgba(255, 255, 255, 0.12);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.22);
}

.form-control::placeholder {
  color: #b7c2ce;
}

/* Botón */
.login-btn {
  background: #1d6ef0;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  transition: all 0.25s ease-in-out;
  border-radius: 8px;
}

.login-btn:hover {
  background: #1657c0;
  transform: translateY(-2px);
}

/* Animación */
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
</style>
