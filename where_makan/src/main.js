import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routers';
import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp(App)
app.use(router);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBCa9b0AaISqJ2I3eidqjG1L_eFzlTOKmw',
    },
}).mount('#app')
