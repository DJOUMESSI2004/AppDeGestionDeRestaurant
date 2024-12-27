import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia' // Importation de Pinia
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Ajout de Pinia à l'application Vue
const pinia = createPinia()
app.use(pinia)

app.use(router).mount('#app')
