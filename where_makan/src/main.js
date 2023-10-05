import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routers';
import VueGoogleMaps from '@fawmi/vue-google-maps';
import VueGeolocation from '@fawmi/vue-browser-geolocation';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)
app.use(router);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBCa9b0AaISqJ2I3eidqjG1L_eFzlTOKmw',
    },
}).mount('#app')
app.use(VueGeolocation);
