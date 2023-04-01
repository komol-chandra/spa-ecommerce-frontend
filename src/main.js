import {createApp} from 'vue'
import './style.css'
import './template'
import './router';
import App from './App.vue'
import router from './router/index';
// 5. Create and mount the root instance.
const app = createApp(App);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount('#app')
// Now the app has started!
