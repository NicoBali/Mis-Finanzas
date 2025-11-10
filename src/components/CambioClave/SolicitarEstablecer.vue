<template>
  <div class="page-wrapper">
    <HeaderMain />
    <div class="content-wrapper d-flex justify-content-center align-items-center">
      <div class="login-card animate__animated animate__fadeInDown">
        <h2 class="text-center fw-bold mb-4 titulo">Recuperar contraseña</h2>

        <form @submit.prevent="solicitarRestablecer">
          <div class="mb-3 input-group">
            <span class="input-group-text"><i class="bi bi-envelope"></i></span>
            <input
              type="email"
              class="form-control"
              placeholder="Correo electrónico"
              v-model="correo"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary w-100 fw-semibold login-btn">
            <i class="bi bi-send"></i> Enviar link
          </button>
        </form>

        <p class="text-center mt-3 text-light small">
          <router-link to="/login" class="link-light text-decoration-none fw-bold">
            Volver al inicio de sesión
          </router-link>
        </p>

        <!-- Toast para correo no registrado -->
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
          <div ref="toastNoRegistrado" class="toast align-items-center text-bg-warning border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
              <div class="toast-body fw-bold">
                ⚠️ Correo no registrado.
              </div>
            </div>
          </div>
        </div>

        <!-- Toast para éxito al enviar link -->
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
          <div ref="toastExito" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
              <div class="toast-body fw-bold">
                ✅ Link de recuperación enviado.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <FooterMain />
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
import HeaderMain from '@/components/PagePrincipal/HeaderMain.vue'
import FooterMain from '@/components/PagePrincipal/FooterMain.vue'
import { Toast } from 'bootstrap'  // Asegúrate de tener Bootstrap JS importado

const correo = ref("")
const router = useRouter()

const toastNoRegistrado = ref(null)
const toastExito = ref(null)

const solicitarRestablecer = async () => {
  if (!correo.value) {
    alert("❌ Ingresa tu correo electrónico.")
    return
  }

  try {
    const response = await axios.post(
      "https://localhost:7037/api/Auth/solicitar-recuperacion",
      { Correo: correo.value },
      { headers: { "Content-Type": "application/json" } }
    )

    // Mostrar toast de éxito
    const bsToastExito = new Toast(toastExito.value, { autohide: true, delay: 3000 })
    bsToastExito.show()

    const token = response.data.link.split("token=")[1]
    router.push(`/restablecer?token=${token}`)

  } catch (error) {
    console.error("Error al solicitar recuperación:", error)
    if (error.response?.status === 404) {
      // Mostrar toast de correo no registrado y que se desvanezca
      const bsToastNo = new Toast(toastNoRegistrado.value, { autohide: true, delay: 3000 })
      bsToastNo.show()
    } else {
      alert("❌ Error al solicitar recuperación.")
    }
  }
}
</script>


<style scoped>
/* Media Queries para móvil */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }

  .login-card {
    padding: 1.5rem;
  }

  .titulo {
    font-size: 1.5rem;
  }

  .login-btn {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
}

/* Fondo igual al login */
.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(145deg, #071526, #0e2238, #0a1a31);
}

.content-wrapper {
  min-height: calc(100vh - 120px); /* Ajuste para header y footer */
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

/* Override footer color to match header */
.footer {
  background-color: #003366 !important;
  color: white !important;
}
</style>
