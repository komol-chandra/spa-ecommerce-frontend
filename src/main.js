import {createApp} from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import './style.css'
import './template'
import './router';
import App from './App.vue'
import router from './router/index';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 5. Create and mount the root instance.
const pinia = createPinia()
const app = createApp(App);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
// Now the app has started!
