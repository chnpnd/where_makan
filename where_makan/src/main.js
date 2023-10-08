import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routers';
import VueGoogleMaps from '@fawmi/vue-google-maps';
// main.js/ts
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'



const app = createApp(App)
app.use(router);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBCa9b0AaISqJ2I3eidqjG1L_eFzlTOKmw',
    },
}).mount('#app')

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        },
      },
  })
  
  
app.use(vuetify)
