<template>
  <div id="funciones">
    <!-- Barra de navegación -->
    <HeaderMain/>

    <!-- Sección principal de Funciones -->
    <section class="hero py-5" style="background-color: #003366; color: white;">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-4">Funciones de Mis Finanzas</h1>
            <p class="lead">Descubre todas las herramientas que ponemos a tu disposición para gestionar tus finanzas de manera efectiva y alcanzar tus metas de ahorro.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección detallada de funciones -->
  <section id="funciones" class="funciones-section">
    <div class="funciones-container">
        <h2>Funciones Principales</h2>
        <p>Administra tus finanzas personales de manera más inteligente y visual.</p>

        <div class="funciones-grid">

            <div class="funcion-item">
                <i class="fas fa-plus-circle fa-3x"></i>
                <h3>Registro de Ingresos y Gastos</h3>
                <p>Controla tu flujo de dinero, categorizando transacciones y revisando balances mensuales.</p>
            </div>

            <div class="funcion-item">
                <i class="fas fa-bullseye fa-3x"></i>
                <h3>Creación de Metas de Ahorro</h3>
                <p>Establece objetivos financieros reales y monitorea tu progreso con gráficos.</p>
            </div>

            <div class="funcion-item">
                <i class="fas fa-chart-line fa-3x"></i>
                <h3>Análisis de Viabilidad</h3>
                <p>Evalúa la capacidad de cumplir tus metas con estadísticas y proyecciones automáticas.</p>
            </div>

            <div class="funcion-item">
                <i class="fas fa-lightbulb fa-3x"></i>
                <h3>Recomendaciones Personalizadas</h3>
                <p>Recibe consejos automáticos basados en tus hábitos financieros.</p>
            </div>

            <!-- Nueva función 5 -->
            <div class="funcion-item">
                <i class="fas fa-chart-pie fa-3x"></i>
                <h3>Gráficos Interactivos</h3>
                <p>Visualiza tus gastos, ingresos y progresos mediante gráficos dinámicos fáciles de interpretar.</p>
            </div>

            <!-- Nueva función 6 -->
            <div class="funcion-item">
                <i class="fas fa-bell fa-3x"></i>
                <h3>Alertas y Recordatorios</h3>
                <p>Recibe notificaciones inteligentes cuando superes tu presupuesto o debas registrar gastos.</p>
            </div>

        </div>
    </div>
</section>


    <!-- Sección de Beneficios Adicionales -->
    <section class="beneficios-adicionales py-5" style="background-color: #fff; color: #003366;">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">Beneficios Adicionales</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i class="fas fa-shield-alt fa-3x text-success mb-3"></i>
                <h5 class="card-title fw-bold">Seguridad Total</h5>
                <p class="card-text">Tus datos están protegidos con encriptación de nivel bancario y protocolos de seguridad avanzados.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i class="fas fa-mobile-alt fa-3x text-info mb-3"></i>
                <h5 class="card-title fw-bold">Acceso Móvil</h5>
                <p class="card-text">Gestiona tus finanzas desde cualquier dispositivo, en cualquier lugar con sincronización en tiempo real.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i class="fas fa-headset fa-3x text-warning mb-3"></i>
                <h5 class="card-title fw-bold">Soporte 24/7</h5>
                <p class="card-text">Equipo de soporte disponible las 24 horas para ayudarte con cualquier duda o problema.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Llamada a la acción -->
    <section class="cta py-5" style="background-color: #003366; color: white;">
      <div class="container text-center">
        <h2 class="fw-bold mb-4">¿Listo para tomar el control de tus finanzas?</h2>
        <p class="lead mb-4">Únete hoy y comienza a construir un futuro financiero más seguro.</p>
        <a href="#registro" class="btn btn-outline-light btn-lg fw-bold px-4 py-3">Comenzar Ahora</a>
      </div>
    </section>

    <!-- Pie de página -->
    <FooterMain/>
  </div>
</template>

<script>
import FooterMain from './FooterMain.vue';
import HeaderMain from './HeaderMain.vue';

export default {
  name: 'PageFunciones',
  components: {
    HeaderMain,
    FooterMain
  }
}
</script>

<style scoped>
/* Importar fuentes modernas */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Estilos generales */
#funciones {
  font-family: 'Poppins', sans-serif;
}

/* Estilos para la sección hero */
.hero {
  min-height: 50vh;
  display: flex;
  align-items: center;
}

/* Estilos para las tarjetas de funciones */
.funciones-detalladas .card {
  transition: transform 0.3s ease;
   
}

.funciones-detalladas .card:hover {
  transform: translateY(-5px);
  
}

/* Estilos para las tarjetas de beneficios adicionales */
.beneficios-adicionales .card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}

.beneficios-adicionales .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3) !important;
}

/* Contenedor general */
.funciones-section {
    background-color: #f8f9fa;
    padding: 60px 15px;
    text-align: center;
}

/* Contenido */
.funciones-container {
    max-width: 1000px;
    margin: auto;
}

.funciones-container h2 {
    font-size: 2rem;
    color: #003366;
    margin-bottom: 15px;
}

.funciones-container p {
    color: #003366;
    font-size: 1rem;
    margin-bottom: 40px;
}

/* Grid de beneficios */
.funciones-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
}

/* Tarjetas */
.funcion-item {
    background-color: #0056b3;
    padding: 20px;
    border-radius: 10px;
    transition: transform .3s, box-shadow .3s;
    color: white;
}

.funcion-item i {
    color: #0056b3;
    margin-bottom: 15px;
}

.funcion-item h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #ffffff;
}

.funcion-item p {
    color: #f8f9fa;
}

/* Hover */
.funcion-item:hover {
    transform: translateY(-7px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.25);
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
}
</style>
