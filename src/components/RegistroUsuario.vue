<template>
  <div class="page-wrapper">
    <HeaderMain />
    <div class="content-wrapper d-flex justify-content-center align-items-center">

      <div class="welcome-text animate__animated animate__fadeInDown">
        <h1 class="fw-bold">Únete a la revolución financiera 🚀</h1>
        <p>Regístrate y empieza a tomar el control de tu dinero como nunca antes.</p>
      </div>

      <div class="registro-card animate__animated animate__fadeInUp">

        <h2 class="text-center fw-bold mb-4 titulo">Crear cuenta</h2>

        <form @submit.prevent="registrarUsuario">

          <div class="mb-3 input-group">
            <span class="input-group-text"><i class="bi bi-person"></i></span>
            <input type="text" class="form-control" placeholder="Nombre" v-model="usuario.nombre" required>
          </div>

          <div class="mb-3 input-group">
            <span class="input-group-text"><i class="bi bi-person-badge"></i></span>
            <input type="text" class="form-control" placeholder="Apellido" v-model="usuario.apellido" required>
          </div>

          <div class="mb-3 input-group">
            <span class="input-group-text"><i class="bi bi-credit-card-2-front"></i></span>
            <input type="number" class="form-control" placeholder="Cédula" v-model="usuario.cedula" required>
          </div>

          <div class="mb-3 input-group">
            <span class="input-group-text"><i class="bi bi-envelope"></i></span>
            <input type="email" class="form-control" placeholder="Correo electrónico" v-model="usuario.correo" required>
          </div>

          <div class="mb-4 input-group">
            <span class="input-group-text"><i class="bi bi-lock"></i></span>
            <input type="password" class="form-control" placeholder="Contraseña" v-model="usuario.contrasena" required>
          </div>

          <button type="submit" class="btn btn-primary w-100 fw-semibold registro-btn">
            <i class="bi bi-person-plus"></i> Registrarme
          </button>

        </form>

        <p class="text-center mt-3 text-light small">
          ¿Ya tienes cuenta? <a href="/login" class="link-light text-decoration-none fw-bold hover-link">Iniciar sesión</a>
        </p>

      </div>
    </div>
    <FooterMain />
  </div>
</template>

<script setup>
import { ref } from "vue"
import HeaderMain from '@/components/PagePrincipal/HeaderMain.vue'
import FooterMain from '@/components/PagePrincipal/FooterMain.vue'

const usuario = ref({
  nombre: "",
  apellido: "",
  cedula: "",
  correo: "",
  contrasena: ""
})

const registrarUsuario = () => {
  if (!usuario.value.nombre || !usuario.value.correo || !usuario.value.contrasena) {
    alert("❌ Completa todos los campos requeridos.")
    return
  }
  console.log("✅ Usuario registrado: ", usuario.value)
  alert(`✅ ¡Bienvenido, ${usuario.value.nombre}!`)
}
</script>

<style scoped>
/* Media Queries para móvil */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }

  .registro-card {
    padding: 1.5rem;
  }

  .titulo {
    font-size: 1.5rem;
  }

  .registro-btn {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  .welcome-text h1 {
    font-size: 1.5rem;
  }

  .welcome-text p {
    font-size: 0.9rem;
  }
}

/* Fondo premium estilo banca digital */
.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(145deg, #071526, #0e2238, #0a1a31);
}

.content-wrapper {
  min-height: calc(100vh - 120px); /* Ajuste para header y footer */
  padding: 2rem;
  flex-direction: column;
}

/* Texto superior motivador */
.welcome-text {
  text-align: center;
  color: white;
  margin-bottom: 1.5rem;
  max-width: 600px;
}

.welcome-text h1 {
  font-size: 2rem;
  background: linear-gradient(90deg, #118cff, #71b8ff, #118cff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 4s linear infinite;
}

.welcome-text p {
  font-size: 1rem;
  opacity: 0.85;
}

@keyframes shine {
  0% { filter: brightness(0.9); }
  50% { filter: brightness(1.3); }
  100% { filter: brightness(0.9); }
}

/* Tarjeta con efecto glass */
.registro-card {
  width: 100%;
  max-width: 430px;
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
  font-size: 1.8rem;
}

/* Input fields */
.input-group-text {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #cbd5e1;
}

.form-control {
  background: rgba(255, 255, 255, 0.12);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.22);
  transition: all 0.2s ease-in-out;
}

.form-control:focus {
  background: rgba(255, 255, 255, 0.18);
  border-color: #51a3ff;
  box-shadow: 0 0 8px rgba(17, 140, 255, 0.4);
}

.form-control::placeholder {
  color: #b7c2ce;
}

/* Botón */
.registro-btn {
  background: #118cff;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  transition: 0.25s ease-in-out;
  border-radius: 8px;
}

.registro-btn:hover {
  background: #0d6ad3;
  transform: translateY(-2px);
}

/* Hover link */
.hover-link:hover {
  text-decoration: underline;
  color: #71b8ff;
}

/* Animación entrada (usando animate.css) */
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

/* Override footer color to match header */
.footer {
  background-color: #003366 !important;
  color: white !important;
}
</style>
