// Importaciones de Vue
import { createApp } from 'vue'
import App from './App.vue'

// Importar router
import router from './router'

// PrimeVue y tema
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Bootstrap y estilos
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Componentes de PrimeVue
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Card from 'primevue/card'

// Iconos de PrimeVue
import 'primeicons/primeicons.css'

// Crear la app
const app = createApp(App)

// Usar router y PrimeVue
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

// Registrar componentes globales
app.component('InputText', InputText)
app.component('PasswordVue', Password)
app.component('ButtonVue', Button)
app.component('CardVue', Card)

// Montar la app
app.mount('#app')


