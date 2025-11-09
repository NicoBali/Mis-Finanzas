<template>
  <div class="app-layout">
    <SlideBarMenu :sidebarOpen="sidebarOpen" />
    <div class="sidebar-overlay" v-if="sidebarOpen && isMobile" @click="toggleSidebar"></div>
    <div class="main-content">
      <button class="menu-toggle" @click="toggleSidebar" v-if="isMobile">
        <i class="bi bi-list"></i>
      </button>
      <div class="metas-container">
        <h2 class="titulo">Mis Metas de Ahorro</h2>

    <!-- Formulario -->
    <CardVue class="card-form">
      <template #title>
        <span class="titulo-seccion">
          <i class="pi" :class="editando ? 'pi-pencil' : 'pi-check-circle'"></i>
          {{ editando ? 'Editar Meta' : 'Nueva Meta' }}
        </span>
      </template>

      <template #content>
        <form @submit.prevent="guardarMeta" class="form-grid">
          <div class="p-field field-with-margin">
            <label for="nombre">Nombre de la meta</label>
            <InputText id="nombre" v-model="metaActual.nombre" placeholder="Ej: Comprar laptop" required />
          </div>

          <div class="p-field field-with-margin">
            <label for="monto">Monto objetivo ($)</label>
            <InputText
              id="monto"
              type="number"
              v-model.number="metaActual.montoObjetivo"
              placeholder="Ej: 5000"
              required
            />
          </div>

          <div class="p-field field-with-margin">
            <label for="plazo">Plazo (meses)</label>
            <InputText
              id="plazo"
              type="number"
              v-model.number="metaActual.plazo"
              placeholder="Ej: 12"
              required
            />
          </div>

          <div class="p-field descripcion">
            <label for="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              v-model="metaActual.descripcion"
              class="form-control"
              rows="2"
              placeholder="Descripción opcional"
            ></textarea>
          </div>

          <ButtonVue
            :label="editando ? 'Actualizar Meta' : 'Agregar Meta'"
            icon="pi pi-check-circle"
            class="boton-accion"
            type="submit"
          />
          <ButtonVue
            v-if="editando"
            label="Cancelar"
            icon="pi pi-times"
            class="boton-cancelar"
            @click="cancelarEdicion"
            outlined
          />
        </form>
      </template>
    </CardVue>

    <!-- Lista de metas -->
    <CardVue v-if="metas.length" class="card-lista">
      <template #title>
        <span class="titulo-seccion"><i class="pi pi-list"></i> Metas Registradas</span>
      </template>

      <template #content>
        <ul class="lista-metas">
          <li v-for="(meta, index) in metas" :key="index" class="meta-item">
            <div class="meta-info">
              <strong>{{ meta.nombre }}</strong>
              <p v-if="meta.descripcion" class="meta-detalle">{{ meta.descripcion }}</p>
              <p class="meta-detalle">
                ${{ meta.montoObjetivo.toLocaleString() }} en {{ meta.plazo }} meses
              </p>
              <p class="meta-estado" :class="estadoClase(meta.estado)">
                {{ meta.estado }}
              </p>
              <small class="meta-sugerencia" v-if="meta.sugerencia">{{ meta.sugerencia }}</small>
            </div>

            <div class="meta-acciones">
              <ButtonVue icon="pi pi-pencil" class="boton-editar" @click="editarMeta(index)" />
              <ButtonVue icon="pi pi-trash" class="boton-eliminar" @click="eliminarMeta(index)" />
            </div>
          </li>
        </ul>
      </template>
    </CardVue>


      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import InputText from "primevue/inputtext"
import ButtonVue from "primevue/button"
import CardVue from "primevue/card"
import SlideBarMenu from "../SlideBarMenu.vue"

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

const ingresosMensuales = 2000
const gastosFijos = 1200
const imprevistos = ingresosMensuales * 0.1
const ahorroMensual = ingresosMensuales - gastosFijos - imprevistos

const metas = ref([])
const editando = ref(false)
const indiceEditando = ref(null)

const metaActual = ref({
  nombre: "",
  montoObjetivo: "",
  plazo: "",
  descripcion: "",
  estado: "En progreso",
  sugerencia: ""
})

function guardarMeta() {
  const ahorroTotal = ahorroMensual * metaActual.value.plazo
  const viable = ahorroTotal >= metaActual.value.montoObjetivo

  metaActual.value.estado = viable ? "Viable" : "No viable"
  if (viable) {
    metaActual.value.sugerencia = "Puedes alcanzar esta meta con tus hábitos actuales"
  } else {
    const shortfall = metaActual.value.montoObjetivo - ahorroTotal
    const requiredMonthly = metaActual.value.montoObjetivo / metaActual.value.plazo
    const extraMonths = Math.ceil(shortfall / ahorroMensual)
    metaActual.value.sugerencia = `Te faltan $${shortfall.toLocaleString()} para alcanzar la meta. Necesitas ahorrar $${requiredMonthly.toFixed(2)} mensuales. Considera extender el plazo en ${extraMonths} meses o reducir el monto objetivo.`
  }

  if (editando.value) {
    metas.value[indiceEditando.value] = { ...metaActual.value }
    editando.value = false
    indiceEditando.value = null
  } else {
    metas.value.push({ ...metaActual.value })
  }

  resetForm()
}

function editarMeta(index) {
  editando.value = true
  indiceEditando.value = index
  metaActual.value = { ...metas.value[index] }
}

function eliminarMeta(index) {
  metas.value.splice(index, 1)
}

function cancelarEdicion() {
  editando.value = false
  indiceEditando.value = null
  resetForm()
}

function resetForm() {
  metaActual.value = {
    nombre: "",
    montoObjetivo: "",
    plazo: "",
    descripcion: "",
    estado: "En progreso",
    sugerencia: ""
  }
}

function estadoClase(estado) {
  return estado === "Viable" ? "estado-viable" : "estado-no-viable"
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Fuente general */
* {
  font-family: 'Poppins', sans-serif;
}

/* Fondo página */
html, body {
  height: 100%;
  margin: 0;
}
body {
  background: linear-gradient(135deg, #002b5b, #1a1a1a);
  color: #f8f9fa;
}

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

/* Contenedor general */
.metas-container {
  max-width: 950px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

/* Titulos */
.titulo {
  text-align: center;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #f8f9fa;
}

.titulo-seccion {
  color: #4a90e2;
  font-weight: 600;
}

/* Cartas gris suave */
.card-form,
.card-lista {
  margin-bottom: 2rem;
  background: #f8f9fa;
  color: #003366;
}

/* Formulario */
.form-grid {
  display: grid;
  gap: 1rem;
}

.field-with-margin .p-inputtext {
  margin-top: 1rem !important;
}

textarea {
  resize: none;
}

.p-inputtext:focus,
textarea:focus {
  border-color: #003366 !important;
  box-shadow: 0 0 0 1px #003366 !important;
}

/* Botones */
.boton-accion {
  background-color: #4a90e2 !important;
  color: white !important;
  font-weight: 600;
  margin-top: 10px;
}
.boton-accion:hover {
  background-color: #003366 !important; /* azul oscuro al pasar cursor */
}
.boton-accion:focus {
  border-color: #4a90e2 !important;
  box-shadow: 0 0 0 1px #4a90e2 !important;
}

.boton-cancelar {
  background-color: #003366 !important;
  color: white !important;
  margin-top: 10px;
  border-color: #003366 !important;
}
.boton-cancelar:hover {
  background-color: #003366 !important;
  color: white !important;
}
.boton-cancelar:focus {
  border-color: #003366 !important;
  box-shadow: 0 0 0 1px #003366 !important;
}

.p-button.p-button-outlined:focus {
  border-color: #003366 !important;
  box-shadow: 0 0 0 1px #003366 !important;
}

/* Lista metas */
.lista-metas {
  list-style: none;
  padding: 0;
}

.meta-item {
  background: #e6e6e6;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meta-info {
  flex: 1;
}

.meta-detalle {
  font-size: 0.9rem;
  color: #333;
}

.meta-estado {
  margin-top: 5px;
  font-weight: 600;
}
.estado-viable {
  color: #0056b3;
}
.estado-no-viable {
  color: #ff4444;
}

.meta-sugerencia {
  display: block;
  font-size: 0.85rem;
  color: #555;
  margin-top: 4px;
  font-style: italic;
}

.meta-acciones {
  display: flex;
  gap: 0.5rem;
}

.boton-editar {
  background-color: #4a90e2 !important;
  color: white !important;
  border: none;
}
.boton-editar:hover {
  background-color: #003366 !important;
}

.boton-eliminar {
  background-color: #ff4444 !important;
  color: white !important;
  border: none;
}
.boton-eliminar:hover {
  background-color: #b02a37 !important;
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

  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1001;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .menu-toggle {
    display: block;
  }

  .form-grid {
    display: flex;
    flex-direction: column;
  }

  .meta-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .meta-info {
    text-align: left;
  }

  .meta-acciones {
    margin-top: 10px;
    align-self: flex-start;
  }
}

@media (max-width: 480px) {
  .metas-container {
    padding: 1rem;
  }
}
</style>
