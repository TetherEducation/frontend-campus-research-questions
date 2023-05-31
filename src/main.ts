import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './i18n';
import router from './router'
import Counter from './components/Counter.vue'
import MapAndQuestion from './common/MapAndQuestion.vue'
import ResultsOfQuestion from './common/ResultsOfQuestion.vue'
import Navbar from './common/Navbar.vue'
import { GoogleMap, Marker, CustomMarker, Circle } from 'vue3-google-map'
import App from './App.vue'
import './style.css'
import CampusAroundView from './views/CampusAroundView.vue';
import { Router } from 'vue-router';

declare module 'pinia' {
    export interface PiniaCustomProperties {
      router: Router;
    }
  }
  
  const pinia = createPinia();
  
  pinia.use(({ store }) => {
    store.router = markRaw(router);
  });

createApp(App)
    .use(pinia)
    .use(router)
    .use(i18n)
    .component('Counter', Counter)
    .component('Navbar', Navbar)
    .component('CampusAroundView', CampusAroundView)
    .component('MapAndQuestion', MapAndQuestion)
    .component('ResultsOfQuestion', ResultsOfQuestion)
    .component('GoogleMap', GoogleMap)
    .component('Marker', Marker)
    .component('Circle', Circle)
    .component('CustomMarker', CustomMarker)
    .mount('#app')
