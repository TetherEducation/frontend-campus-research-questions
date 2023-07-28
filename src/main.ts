import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import CampusAroundView from './views/CampusAroundView.vue';
import App from './App.vue'
import MapAndQuestion from './common/MapAndQuestion.vue'
import RadioButtonQuestion from './common/components/RadioButtonQuestion.vue'
import ResultsOfQuestion from './common/ResultsOfQuestion.vue'
import NavbarLegacy from './common/Navbar.vue'
import Welcome from './pages/Welcome.vue'
import FirstQuestion from './pages/FirstQuestion.vue'
import SecondQuestion from './pages/SecondQuestion.vue'
import ThirdQuestion from './pages/ThirdQuestion.vue'
import Navbar from './common/components/Navbar.vue'
import NextButton from './common/components/NextButton.vue'
import Loader from './common/components/Loader.vue'
import router from './router'
import { GoogleMap, Marker, CustomMarker, Circle } from 'vue3-google-map'
import './style.css'
import { i18n } from './i18n';
import { Router } from 'vue-router';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});


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
    .use(vuetify)
    .component('Navbar', Navbar)
    .component('NextButton', NextButton)
    .component('RadioButtonQuestion', RadioButtonQuestion)
    .component('Loader', Loader)
    .component('Welcome', Welcome)
    .component('FirstQuestion', FirstQuestion)
    .component('SecondQuestion', SecondQuestion)
    .component('ThirdQuestion', ThirdQuestion)
    .component('Navbar', Navbar)
    .component('NavbarLegacy', NavbarLegacy)
    .component('CampusAroundView', CampusAroundView)
    .component('MapAndQuestion', MapAndQuestion)
    .component('ResultsOfQuestion', ResultsOfQuestion)
    .component('GoogleMap', GoogleMap)
    .component('Marker', Marker)
    .component('Circle', Circle)
    .component('CustomMarker', CustomMarker)
    .mount('#app')
