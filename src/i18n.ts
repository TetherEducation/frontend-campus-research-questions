import { createI18n } from 'vue-i18n'
import { en } from './locales/en';
import { es } from './locales/es';
import { es_DO } from './locales/es-DO'; 
import { es_CL } from './locales/es-CL';

export enum Locales {
    EN = 'en',
    ES = 'es',
    'es-CL' = 'es-CL',
    'es-DO' = 'es-DO',
}

export const LOCALES = [
    {
        value: Locales.EN,
        caption: 'English',
    },
    {
        value: Locales.ES,
        caption: 'Español',
    },
    {
        value: Locales['es-CL'],
        caption: 'Español (Chile)',
    },
    {
        value: Locales['es-DO'],
        caption: 'Español (República Dominicana)',
    }
]

export const messages = {
    [Locales.EN]: en,
    [Locales.ES]: es,
    [Locales['es-DO']]: es_DO,
    [Locales['es-CL']]: es_CL,
}

export const defaultLocale = Locales.ES;

export const i18n = createI18n({
    messages,
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    globalInjection: true,
    legacy: false,
})
