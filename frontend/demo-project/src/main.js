import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import globals from '../globals.js';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// createApp(App).use(store).use(router).mount('#app')
const app = createApp(App);
app.config.globalProperties.$globals = globals;

app.use(router);
app.use(store);
app.mount('#app');
