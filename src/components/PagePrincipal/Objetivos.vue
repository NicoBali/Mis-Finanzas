<template>
  <div id="objetivos">
    <!-- Barra de navegación -->
    <nav class="navbar navbar-expand-lg navbar-dark shadow-sm" style="background-color: #003366;">
      <div class="container">
        <router-link class="navbar-brand fw-bold text-white" to="/home">
          <i class="fas fa-wallet me-2"></i>Mis Finanzas
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/home">Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/funciones">Funciones</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/objetivos">Objetivos</router-link>
            </li>
            <li class="nav-item">
              <a class="btn ms-3" style="background-color: white; color: #003366;" href="#registro">Iniciar Sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

   

    <!-- Sección de objetivos detallados -->
    <section class="objetivos-detallados">
  <div class="objetivo">
    <h2>Promover la Educación Financiera</h2>
    <p>Creemos que el conocimiento financiero es fundamental...</p>

    <h3>Cómo lo logramos:</h3>
    <ul class="detalles">
      <li>Tutoriales interactivos</li>
      <li>Glosario de términos financieros</li>
      <li>Artículos educativos regulares</li>
      <li>Calculadoras financieras</li>
    </ul>
  </div>

  <div class="objetivo">
    <h2>Fomentar el Ahorro Responsable</h2>
    <p>Motivamos a adoptar hábitos de ahorro saludables...</p>

    <h3>Estrategias:</h3>
    <ul class="detalles">
      <li>Metas de ahorro personalizadas</li>
      <li>Recordatorios automáticos</li>
      <li>Recompensas por logros</li>
      <li>Comunidad de ahorristas</li>
    </ul>
  </div>

  <div class="objetivo">
    <h2>Proporcionar Análisis Detallados</h2>
    <p>Ofrecemos insights sobre patrones de gasto y mejora...</p>

    <h3>Herramientas:</h3>
    <ul class="detalles">
      <li>Reportes mensuales detallados</li>
      <li>Análisis de tendencias</li>
      <li>Comparativas financieras</li>
      <li>Predicciones financieras</li>
    </ul>
  </div>

  <div class="objetivo">
    <h2>Facilitar la Planificación Financiera</h2>
    <p>Ayudamos a crear planes de ahorro viables a largo plazo...</p>

    <h3>Planes disponibles:</h3>
    <ul class="detalles">
      <li>Planificación de jubilación</li>
      <li>Ahorro para emergencias</li>
      <li>Compra de vivienda</li>
      <li>Planes de inversión</li>
    </ul>
  </div>
</section>


    <!-- Sección de impacto -->
    <section class="impacto py-5" style="background-color: #f8f9fa;">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">Nuestro Impacto</h2>
        <div class="row g-4 text-center">
          <div class="col-md-3">
            <h3 class="text-primary fw-bold">50,000+</h3>
            <p class="mb-0">Usuarios activos</p>
          </div>
          <div class="col-md-3">
            <h3 class="text-primary fw-bold">$2M+</h3>
            <p class="mb-0">Ahorrados por nuestros usuarios</p>
          </div>
          <div class="col-md-3">
            <h3 class="text-primary fw-bold">95%</h3>
            <p class="mb-0">Satisfacción del usuario</p>
          </div>
          <div class="col-md-3">
            <h3 class="text-primary fw-bold">24/7</h3>
            <p class="mb-0">Soporte disponible</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Llamada a la acción -->
    <section class="cta py-5" style="background-color: #003366; color: white;">
      <div class="container text-center">
        <h2 class="fw-bold mb-4">Únete a nuestra misión</h2>
        <p class="lead mb-4">Ayúdanos a democratizar la educación financiera y construir un futuro más próspero para todos.</p>
        <a href="#registro" class="btn btn-outline-light btn-lg fw-bold px-4 py-3">Comenzar Ahora</a>
      </div>
    </section>

    <!-- Pie de página -->
    <footer class="footer py-4" style="background-color: #f0f0f0; color: #333333;">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <p class="mb-0">&copy; 2025 Mis Finanzas. Todos los derechos reservados.</p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="mb-0">Contacto: info@misfinanzas.com | Tel: +57 3003012945</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'PageObjetivos'
}
</script>

<style scoped>
/* Importar fuentes modernas */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Estilos generales */
#objetivos {
  font-family: 'Poppins', sans-serif;
}

/* Estilos para la sección hero */
.hero {
  min-height: 50vh;
  display: flex;
  align-items: center;
}

/* Estilos para las tarjetas de objetivos */
.objetivos-detallados .card {
  transition: transform 0.3s ease;
}

.objetivos-detallados .card:hover {
  transform: translateY(-5px);
}

.objetivos-detallados {
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 40px;
  background-color: #f8f9fa;
  flex-wrap: wrap;
}

.objetivo {
  background-color: #ffffff;
  border: 1px solid rgba(0, 51, 102, 0.3);
  border-radius: 10px;
  width: 300px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 51, 102, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;
}

.objetivo:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 86, 179, 0.3);
}

.objetivo h2 {
  font-size: 22px;
  color: #003366;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 700;
}

.objetivo p {
  font-size: 14px;
  color: #000;
  margin-bottom: 20px;
  text-align: center;
  line-height: 1.6;
}

.objetivo h3 {
  font-size: 18px;
  color: #0056b3;
  margin: 15px 0 10px;
}

.detalles {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detalles li {
  font-size: 14px;
  color: #000;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.detalles li:last-child {
  border-bottom: none;
}

.detalles li:hover {
  background-color: #e3ecf6;
  font-weight: bold;
  cursor: pointer;
}


/* Estilos para el footer */
.footer {
  margin-top: auto;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .cta .btn {
    width: 100%;
    margin-bottom: 1rem;
  }

  .impacto .col-md-3 {
    margin-bottom: 2rem;
  }
}

</style>
