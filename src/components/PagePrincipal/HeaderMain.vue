/<template>
   <!-- Barra de navegación -->
  <nav class="navbar navbar-expand-lg navbar-dark shadow-sm" style="background-color: #003366;">
    <div class="container">
      <router-link class="navbar-brand fw-bold text-white" to="/principal">
        <i class="fas fa-wallet me-2"></i>Mis Finanzas
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link active" to="/principal">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/funciones">Funciones</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/objetivos">Objetivos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="btn ms-3" style="background-color: white; color: #003366;">
              Iniciar sesión
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'HeaderMain'
}
</script>

<style>

</style>