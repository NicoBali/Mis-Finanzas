<template>
  <div id="pagina-principal">
    <!-- Barra de navegación -->
    <HeaderMain/>

    <!-- Sección principal (Hero) -->
    <section id="inicio" class="hero py-5" style="background-color: #003366; color: white;">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">Toma el control de tus finanzas y alcanza tus metas de ahorro.</h1>
            <p class="lead mb-4">Gestiona tus ingresos y gastos de manera inteligente, establece metas realistas y recibe recomendaciones personalizadas para mejorar tu salud financiera.</p>
            <a href="#registro" class="btn btn-light btn-lg fw-bold px-4 py-3">Comienza ahora</a>
          </div>
          <div class="col-lg-6 text-center">
            <img src="@/assets/laptopConDashboard.avif" alt="Foto finanzas" class="img-fluid rounded shadow">
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de descripción -->
    <section class="descripcion py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="fw-bold mb-4">¿Qué es Mis Finanzas?</h2>
            <p class="lead">Mis Finanzas es una aplicación web diseñada para ayudarte a gestionar tus ingresos y gastos de forma eficiente. Te permite crear metas de ahorro viables, analizar la viabilidad de tus planes financieros y recibir recomendaciones personalizadas basadas en tus hábitos de consumo. Nuestro objetivo es fomentar una cultura del ahorro responsable y ayudarte a alcanzar la estabilidad financiera.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de funcionalidades -->
    <section id="funcionalidades" class="funcionalidades py-5"  style="background-color: #fff; color: #003366;">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">Funcionalidades Principales</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3 text-center">
            <div class="card h-100 border-0 shadow-lg">
              <div class="card-body">
                <i class="fas fa-plus-circle fa-3x text-success mb-3"></i>
                <h5 class="card-title fw-bold">Registro de Ingresos y Gastos</h5>
                <p class="card-text">Registra fácilmente tus ingresos y gastos diarios para mantener un seguimiento preciso de tu flujo de dinero.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 text-center">
            <div class="card h-100 border-0 shadow-lg">
              <div class="card-body">
                <i class="fas fa-bullseye fa-3x text-success mb-3"></i>
                <h5 class="card-title fw-bold">Creación de Metas de Ahorro</h5>
                <p class="card-text">Establece metas de ahorro realistas y sigue tu progreso hacia objetivos financieros específicos.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 text-center">
            <div class="card h-100 border-0 shadow-lg">
              <div class="card-body">
                <i class="fas fa-chart-line fa-3x text-success mb-3"></i>
                <h5 class="card-title fw-bold">Análisis de Viabilidad</h5>
                <p class="card-text">Analiza la viabilidad de tus metas de ahorro basándote en tus ingresos y patrones de gasto actuales.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 text-center">
            <div class="card h-100 border-0 shadow-lg">
              <div class="card-body">
                <i class="fas fa-lightbulb fa-3x text-success mb-3"></i>
                <h5 class="card-title fw-bold">Recomendaciones Personalizadas</h5>
                <p class="card-text">Recibe consejos personalizados para optimizar tus finanzas y mejorar tus hábitos de ahorro.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de objetivos -->
    <section id="objetivos" class="services py-5">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">🎯 Objetivos</h2>
        <div class="services-container">

          <div class="service-item">
            <div class="service-icon">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="service-description">
              <h3>🎓 Promover la educación financiera</h3>
              <p>Ayudar a los usuarios a entender mejor sus finanzas personales y tomar decisiones más inteligentes 💡.</p>
            </div>
          </div>

          <div class="service-item">
            <div class="service-icon">
              <i class="fas fa-piggy-bank"></i>
            </div>
            <div class="service-description">
              <h3>🐖 Fomentar el ahorro responsable</h3>
              <p>Crear herramientas que motiven a ahorrar de manera constante y sostenible 📈.</p>
            </div>
          </div>

          <div class="service-item">
            <div class="service-icon">
              <i class="fas fa-chart-bar"></i>
            </div>
            <div class="service-description">
              <h3>📊 Proporcionar análisis detallados</h3>
              <p>Ofrecer insights claros sobre patrones de gasto y oportunidades de mejora 💬.</p>
            </div>
          </div>

          <div class="service-item">
            <div class="service-icon">
              <i class="fas fa-calendar-alt"></i>
            </div>
            <div class="service-description">
              <h3>📅 Facilitar la planificación financiera</h3>
              <p>Ayudar a crear planes de ahorro viables a largo plazo y mantenerlos al día 🕒.</p>
            </div>
          </div>

        </div>
      </div>
  </section>


    <!-- Sección de Principales Problemas para Ahorrar -->
    <section class="problema py-5"  style="background-color: #fff; color: #003366;">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">Principales Problemas para Ahorrar</h2>
        <div class="row g-4">
          <div class="col-md-6">
            <div class="card h-100 border-0 shadow-lg">
              <div class="card-body text-center">
                <i class="fas fa-chart-pie fa-3x text-danger mb-3"></i>
                <h5 class="card-title fw-bold">Dificultad para Controlar Gastos</h5>
                <p class="card-text">Muchos no logran identificar y controlar sus gastos diarios, lo que impide acumular ahorros.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card h-100 border-0 shadow-lg">
              <div class="card-body text-center">
                <i class="fas fa-users fa-3x text-warning mb-3"></i>
                <h5 class="card-title fw-bold">Falta de Metas Claras</h5>
                <p class="card-text">Sin objetivos definidos, es fácil desviarse y gastar en lugar de ahorrar para el futuro.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-lg-8 mx-auto text-center">
            <h3 class="fw-bold mb-3" style="color: #003366;">¿Cómo te Ayuda Mis Finanzas?</h3>
            <p class="lead">En Mis Finanzas, te proporcionamos herramientas inteligentes para identificar patrones de gasto, establecer metas realistas y recibir recomendaciones personalizadas. Nuestro análisis considera tus ingresos, gastos y un fondo de emergencias del 10%, ayudándote a crear un plan de ahorro viable y sostenible.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Justificación -->
    <section class="faq">
      <h2>¿Por Qué Mis Finanzas?</h2>
      <div class="faq-item">
        <input type="checkbox" id="faq1">
        <label for="faq1" class="faq-question">¿Por qué elegir Mis Finanzas?</label>
        <div class="faq-answer">
          <p>Llenamos el vacío en planificación de metas de ahorro realistas, ayudándote a gestionar tus finanzas de manera efectiva.</p>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq2">
        <label for="faq2" class="faq-question">¿Qué hace único a Mis Finanzas?</label>
        <div class="faq-answer">
          <p>Ofrecemos un enfoque único con análisis inteligente que evalúa la viabilidad de tus metas considerando ingresos, gastos y un 10% para emergencias.</p>
        </div>
      </div>

      <div class="faq-item">
        <input type="checkbox" id="faq3">
        <label for="faq3" class="faq-question">¿Qué pasa si mi meta no es viable?</label>
        <div class="faq-answer">
          <p>Si tu meta no es viable, te proponemos sugerencias prácticas como ajustar plazos o reducir montos para hacerla alcanzable.</p>
        </div>
      </div>
    </section>

    <!-- Testimonio y llamada a la acción -->
    <!-- Testimonio y llamada a la acción -->
<section class="testimonio py-5" style="background-color: #003366; color: white;">
  <div class="container text-center">
    <div class="testimonial-slider">
      <div
        class="testimonial-item"
        v-for="(testimonial, index) in testimonials"
        :key="index"
        :class="{ active: index === currentTestimonial }"
      >
        <!-- Imagen del usuario -->
        <img
          v-if="testimonial.photo"
          :src="testimonial.photo"
          alt="Foto del usuario"
          class="testimonial-photo mb-3"
        />

        <blockquote class="blockquote mb-4">
          <p class="mb-0">"{{ testimonial.text }}"</p>
        </blockquote>
        <footer class="blockquote-footer" style="color: white;">
          {{ testimonial.author }}, {{ testimonial.role }}
        </footer>
      </div>
    </div>

    <div class="testimonial-indicators mt-3">
      <span
        v-for="(testimonial, index) in testimonials"
        :key="index"
        class="indicator"
        :class="{ active: index === currentTestimonial }"
        @click="setTestimonial(index)"
      ></span>
    </div>

    <div class="mt-4">
      <a href="#registro" class="btn btn-light btn-lg fw-bold px-4 py-3">
        Únete a miles de personas que ya están ahorrando
      </a>
    </div>
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
  name: 'PaginaPrincipal',
  components: {
    HeaderMain,
    FooterMain
  },
  data() {
    return {
      testimonials: [
  {
    text: "Mis Finanzas me ha ayudado a ahorrar más de $500 en los últimos 3 meses. ¡Es increíble cómo una buena planificación puede cambiar tu vida financiera!",
    author: "María González",
    role: "Usuaria Activa",
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    text: "Gracias a Mis Finanzas, ahora tengo metas claras de ahorro y puedo ver mi progreso en tiempo real. ¡Altamente recomendado!",
    author: "Carlos Rodríguez",
    role: "Usuario Activo",
    photo: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    text: "La aplicación me ha enseñado a gestionar mejor mis gastos. He logrado crear un fondo de emergencias y estoy más tranquilo financieramente.",
    author: "Ana López",
    role: "Usuaria Activa",
    photo: "https://randomuser.me/api/portraits/women/47.jpg"
  }
],

      currentTestimonial: 0
    }
  },
  mounted() {
    this.startAutoSlide()
  },
  methods: {
    setTestimonial(index) {
      this.currentTestimonial = index
    },
    startAutoSlide() {
      setInterval(() => {
        this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length
      }, 3000) // Cambia cada 5 segundos
    }
  }
}
</script>

<style scoped>
/* Importar fuentes modernas */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Estilos generales */
#pagina-principal {
  font-family: 'Poppins', sans-serif;
}

/* Estilos para la sección hero */
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
}

/* Estilos para la sección de servicios */
/* Sección de servicios (Objetivos) */
.services {
  background-color: #f8f9fa;
}

.services-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

/* Tarjetas de objetivos */
.service-item {
  display: flex;
  flex-direction: column; /* Centra verticalmente el contenido */
  justify-content: center;
  align-items: center; /* Centra horizontalmente */
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}

/* Íconos */
.service-icon i {
  font-size: 2.5rem;
  color: #003366;
  margin-bottom: 1rem;
}

/* Títulos y texto */
.service-description h3 {
  margin-bottom: 0.5rem;
  color: #003366;
  font-weight: 600;
}

.service-description p {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .services-container {
    gap: 1.5rem;
  }
  .service-item {
    padding: 1.5rem;
  }
}


/* Estilos para las tarjetas de funcionalidades */
.funcionalidades .card {
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}

.funcionalidades .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3) !important;
}

/* Estilos para las tarjetas de problema */
.problema .card {
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}

.problema .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3) !important;
}

/* Estilos para la sección FAQ */
.faq {
  background-color: #f8f9fa;
  color: #333333;
  padding: 40px;
}

.faq h2 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 20px;
  color: #003366;
}

.faq-item {
  position: relative;
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.faq-question {
  display: block;
  background-color: #0056b3;
  color: #FFFFFF;
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  border-bottom: 1px solid #ffffff;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: #003366;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  background-color: #ffffff;
  padding: 0 15px;
  font-size: 16px;
  color: #333333;
  border: 1px solid #e9ecef;
  border-top: none;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]:checked + .faq-question + .faq-answer {
  max-height: 200px;
  padding: 15px;
}

/* Estilos para el slider de testimonios */
.testimonial-slider {
  position: relative;
  overflow: hidden;
  height: 200px; /* Ajusta según el contenido */
}

.testimonial-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.testimonial-item.active {
  opacity: 1;
}

.testimonial-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background-color: white;
}

.testimonial-photo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  margin: 0 auto;
  display: block;
}


/* Estilos para el footer */
.footer {
  margin-top: auto;
}

/* Estilos responsivos adicionales */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .hero .btn {
    width: 100%;
  }
}
</style>
