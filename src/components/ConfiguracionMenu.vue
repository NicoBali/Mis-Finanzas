<template>
  <div class="app-layout">
    <SlideBarMenu :sidebarOpen="sidebarOpen" />
    <div class="sidebar-overlay" v-if="sidebarOpen && isMobile" @click="toggleSidebar"></div>
    <div class="main-content">
      <button class="menu-toggle" @click="toggleSidebar" v-if="isMobile">
        <i class="bi bi-list"></i>
      </button>
      <div class="config-container">
        <div class="config-card shadow-lg rounded-4 p-5">
          <h2 class="fw-bold text-primary mb-4">
            ⚙️ Configuración de usuario
          </h2>

          <!-- PERFIL DE USUARIO -->
          <section class="config-section mb-5">
            <h5 class="section-title text-primary mb-3">👤 Perfil del usuario</h5>
            <div class="row g-3">
              <div class="col-md-6">
                <div class="form-floating">
                  <input type="text" v-model="nombre" class="form-control" id="nombre" placeholder="Tu nombre" readonly />
                  <label for="nombre">Nombre</label>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-floating">
                  <input type="email" v-model="correo" class="form-control" id="correo" placeholder="Correo electrónico" readonly />
                  <label for="correo">Correo electrónico</label>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-floating">
                  <input type="password" v-model="password" class="form-control" id="password" placeholder="Contraseña" disabled />
                  <label for="password">Contraseña</label>
                </div>
              </div>
              <div class="col-md-6 d-flex align-items-center">
                <button class="btn btn-outline-primary w-100 fw-semibold py-3" @click="abrirModal">
                  🔑 Cambiar contraseña
                </button>
              </div>
            </div>
          </section>

          <!-- MONEDA PREDETERMINADA -->
          <section class="config-section mb-5">
            <h5 class="section-title text-primary mb-3">💰 Moneda predeterminada</h5>
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
            <h5 class="section-title text-primary mb-3">💬 Mensajes motivacionales</h5>
            <div class="form-floating">
              <select v-model="mensaje" class="form-select" id="mensaje">
                <option>¡Vas bien con tus finanzas! 💪</option>
                <option>Recuerda registrar tus gastos diarios 🧾</option>
                <option>Pequeños pasos crean grandes logros 🚀</option>
                <option>Ahorrar hoy, disfrutar mañana 🌅</option>
              </select>
              <label for="mensaje">Selecciona un mensaje</label>
            </div>
            <div class="preview-message mt-4 p-4 rounded text-center fw-semibold">{{ mensaje }}</div>
          </section>

          <!-- BOTÓN GUARDAR -->
          <div class="text-end">
            <button class="btn btn-primary fw-bold px-5 py-3" @click="guardarConfiguracion">
              💾 Guardar cambios
            </button>
          </div>
        </div>

        <!-- MODAL CAMBIAR CONTRASEÑA -->
        <div class="modal fade" id="cambiarPasswordModal" tabindex="-1" aria-labelledby="cambiarPasswordModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="cambiarPasswordModalLabel">Cambiar contraseña</h5>
                <button type="button" class="btn-close" @click="cerrarModal" aria-label="Cerrar"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="oldPassword" class="form-label">Contraseña antigua</label>
                  <input type="password" class="form-control" id="oldPassword" v-model="oldPassword" placeholder="Escribe tu contraseña actual" />
                </div>
                <div class="mb-3">
                  <label for="newPassword" class="form-label">Nueva contraseña</label>
                  <input type="password" class="form-control" id="newPassword" v-model="newPassword" placeholder="Escribe la nueva contraseña" />
                </div>
                <div v-if="errorMsg" class="alert alert-danger mt-2">{{ errorMsg }}</div>
                <div v-if="successMsg" class="alert alert-success mt-2">{{ successMsg }}</div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
                <button type="button" class="btn btn-primary" @click="actualizarPassword">Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Modal } from "bootstrap";
import SlideBarMenu from "./SlideBarMenu.vue";

// Sidebar
const isMobile = ref(false);
const sidebarOpen = ref(false);
function toggleSidebar() { sidebarOpen.value = !sidebarOpen.value }
function checkMobile() { isMobile.value = window.innerWidth <= 768 }
onMounted(() => { checkMobile(); window.addEventListener('resize', checkMobile) });
onUnmounted(() => { window.removeEventListener('resize', checkMobile) });

// Datos usuario
const nombre = ref("");
const correo = ref("");
const password = ref("");
const moneda = ref("COP");
const mensaje = ref("¡Vas bien con tus finanzas! 💪");

// Modal
const oldPassword = ref("");
const newPassword = ref("");
const errorMsg = ref("");
const successMsg = ref("");
const cambiarPasswordModalInstance = ref(null);

// Usuario ID
const usuarioId = ref(null);

// Cargar usuario
const cargarUsuario = async () => {
  const userData = localStorage.getItem('usuario');
  if (userData) {
    const user = JSON.parse(userData);
    usuarioId.value = user.id || user.usuarioId || user.Id;
    try {
      const response = await fetch(`https://localhost:7037/api/Usuarios/${usuarioId.value}`);
      if (!response.ok) throw new Error("No se pudo cargar el usuario");
      const data = await response.json();
      nombre.value = data.nombre;
      correo.value = data.correo;
      password.value = data.contrasena;
    } catch (error) { console.error("Error cargando usuario:", error); }
  }
};
onMounted(() => { cargarUsuario(); 
  const modalEl = document.getElementById("cambiarPasswordModal");
  cambiarPasswordModalInstance.value = new Modal(modalEl, { backdrop: 'static' });
});

// Abrir y cerrar modal
const abrirModal = () => {
  errorMsg.value = "";
  successMsg.value = "";
  oldPassword.value = "";
  newPassword.value = "";
  cambiarPasswordModalInstance.value.show();
};
const cerrarModal = () => {
  cambiarPasswordModalInstance.value.hide();
};

// Guardar configuración
const guardarConfiguracion = () => {
  const config = { moneda: moneda.value, mensaje: mensaje.value };
  console.log("Configuración guardada:", config);
  alert("✅ Configuración guardada correctamente");
};

// Actualizar contraseña
const actualizarPassword = async () => {
  errorMsg.value = "";
  successMsg.value = "";

  if (!oldPassword.value || !newPassword.value) {
    errorMsg.value = "Debes llenar ambos campos";
    return;
  }

  try {
    const response = await fetch("https://localhost:7037/api/Auth/cambiar-contrasena", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UsuarioId: usuarioId.value,
        ContrasenaActual: oldPassword.value,
        NuevaContrasena: newPassword.value,
      }),
    });

    const data = await response.text();
    if (!response.ok) { errorMsg.value = data || "Ocurrió un error"; return; }

    successMsg.value = data;
    password.value = newPassword.value;
    oldPassword.value = "";
    newPassword.value = "";

    // Cerrar modal después de mostrar mensaje
    setTimeout(() => {
      cerrarModal();
      successMsg.value = "";
    }, 1000);

  } catch (error) {
    console.error(error);
    errorMsg.value = "Error al conectar con el servidor";
  }
};
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

.config-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #f2f4f7;
  padding: 3rem;
  font-family: "Poppins", sans-serif;
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

  .config-container {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .config-container {
    padding: 1rem;
  }
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
