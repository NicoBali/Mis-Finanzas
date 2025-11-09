<template>
  <div>
    <!-- 🔹 Botón hamburguesa solo visible en móvil -->
    <button class="menu-toggle d-md-none" @click="toggleSidebar">
      <i class="bi" :class="sidebarOpen ? 'bi-x-lg' : 'bi-list'"></i>
    </button>

    <!-- 🔹 Sidebar principal -->
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <h3 class="logo">💰 Mis Finanzas</h3>

      <ul class="menu">
        <li @click="cambiar('DashboardMain')">
          <i class="bi bi-bar-chart-line"></i> Dashboard
        </li>
        <li @click="cambiar('RegistrarIngreso')">
          <i class="bi bi-cash-coin"></i> Registrar ingreso
        </li>
        <li @click="cambiar('RegistrarGasto')">
          <i class="bi bi-journal-bookmark"></i> Registrar gasto
        </li>
        <li @click="cambiar('RegistrarMeta')">
          <i class="bi bi-bullseye"></i> Meta de ahorro
        </li>
        <li @click="cambiar('HistorialFinanciero')">
          <i class="bi bi-clock-history"></i> Historial financiero
        </li>

        <hr />

        <li @click="cambiar('ConfiguracionMenu')">
          <i class="bi bi-gear"></i> Configuración
        </li>

        <li class="logout">
          <i class="bi bi-box-arrow-right"></i> Cerrar sesión
        </li>
      </ul>
    </aside>

    <!-- 🔹 Fondo oscuro cuando el menú móvil está abierto -->
    <div
      v-if="sidebarOpen"
      class="overlay d-md-none"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["change-section"]);
const sidebarOpen = ref(false);

const cambiar = (seccion) => {
  emit("change-section", seccion);
  sidebarOpen.value = false; // 🔹 Cierra el menú en móvil al hacer clic
};

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>

<style scoped>
/* === ESTRUCTURA GENERAL === */
.sidebar {
  width: 250px;
  background: #111c2e;
  padding: 2rem 1rem;
  color: #d9e4ff;
  box-shadow: 8px 0px 20px rgba(0, 0, 0, 0.3);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.logo {
  text-align: center;
  font-weight: bold;
  margin-bottom: 2rem;
  font-size: 1.3rem;
  color: #5ca7ff;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  padding: 12px 15px;
  cursor: pointer;
  margin-bottom: 8px;
  border-radius: 10px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu li:hover {
  background: #1c2a44;
  box-shadow: inset 2px 2px 8px rgba(0, 0, 0, 0.4),
    inset -2px -2px 8px rgba(255, 255, 255, 0.05);
}

.logout {
  color: #ff7b7b;
}

/* === BOTÓN HAMBURGUESA === */
.menu-toggle {
  position: fixed;
  top: 15px;
  left: 15px;
  background: #111c2e;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.5rem;
  padding: 8px 10px;
  z-index: 1100;
  cursor: pointer;
  transition: background 0.3s ease;
}

.menu-toggle:hover {
  background: #1c2a44;
}

/* === MODO MÓVIL === */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 900;
  }
}

/* === MODO ESCRITORIO === */
@media (min-width: 769px) {
  .menu-toggle {
    display: none;
  }

  .sidebar {
    transform: translateX(0);
  }
}
</style>
