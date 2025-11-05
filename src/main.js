import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

<<<<<<< HEAD
// Importar Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Importar Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App).use(router).mount('#app')
=======

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Importar componentes de PrimeVue
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Card from 'primevue/card'

import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

// ✅ Registrar componentes globales
app.component('InputText', InputText)
app.component('PasswordVue', Password)
app.component('ButtonVue', Button)
app.component('CardVue', Card)

app.mount('#app')
>>>>>>> 15ed596 (Registro, login, barra lateral - Nicolas)
