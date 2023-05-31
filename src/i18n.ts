import { createI18n } from 'vue-i18n'
import { en } from './locales/en';
import { es } from './locales/es';


export enum Locales {
    EN = 'en',
    ES = 'es',
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
]

export const messages = {
    [Locales.EN]: en,
    [Locales.ES]: es,
}

export const defaultLocale = Locales.ES;

export const i18n = createI18n({
    messages,
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    globalInjection: true,
    legacy: false,
})
