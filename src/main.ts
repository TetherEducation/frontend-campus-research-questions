import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import router from './router'
import Counter from './components/Counter.vue'
import App from './App.vue'
import './style.css'

const i18n = createI18n({
    locale: 'en',
    messages: {
        en: {
            counter: 'Counter',
        },
    },
});

createApp(App)
    .use( createPinia() )
    .use(router)
    .use(i18n)
    .component('Counter', Counter)
    .mount('#app')
