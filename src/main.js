import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Paginate from 'vuejs-paginate-next'

import "@/assets/css/main.css"

const app = createApp(App)

app.component('Paginate', Paginate)
app.use(router)
app.mount('#app')
