import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import store from '@/store/index'
import components from '@/components/UI'


import 'bootstrap/dist/css/bootstrap.css'



const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app.use(router)
app.use(store)
app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js';


