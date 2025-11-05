<template>
  <aside class="sidebar">
    <h3 class="logo">Mis Finanzas</h3>

    <ul class="menu">
      <li @click="cambiar('DashboardMain')"><i class="bi bi-bar-chart-line"></i> Dashboard</li>
      <li @click="cambiar('RegistrarIngreso')"><i class="bi bi-cash-coin"></i> Registrar ingreso</li>
      <li @click="cambiar('RegistrarPrestamo')"><i class="bi bi-journal-bookmark"></i> Registrar gasto</li>
      <li @click="cambiar('RegistrarMeta')"><i class="bi bi-bullseye"></i> Meta de ahorro</li>
      <li @click="cambiar('HistorialFinanciero')"><i class="bi bi-clock-history"></i> Historial financiero</li>

      <hr />
      <li><i class="bi bi-gear"></i> Configuración</li>
      <li class="logout"><i class="bi bi-box-arrow-right"></i> Cerrar sesión</li>
    </ul>
  </aside>
</template>

<script setup>
/* const emit = defineEmits(["change-section"])
const cambiar = (seccion) => emit("change-section", seccion) */
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #111c2e;
  padding: 2rem 1rem;
  color: #d9e4ff;
  box-shadow: 8px 0px 20px rgba(0,0,0,0.3);
  height: 100vh; /* 🔥 Asegura que el menú cubra toda la pantalla */
  position: fixed; /* 🔥 Sidebar fijo */
  left: 0;
  top: 0;
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
  box-shadow: inset 2px 2px 8px rgba(0,0,0,0.4),
              inset -2px -2px 8px rgba(255,255,255,0.05);
}

.logout {
  color: #ff7b7b;
}
</style>
