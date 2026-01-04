import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import languageDetector from 'i18next-browser-languagedetector';

import ru from './locales/ru.json';
import en from './locales/en.json';
import cz from './locales/cz.json';

i18n
    .use(languageDetector)
    .use(initReactI18next)
.init({
    resources: {
        ru: {translation: ru},
        en: {translation: en},
        cz: {translation: cz},
    },
    fallbackLng: 'ru',
    interpolation: {
        escapeValue: false
    },
});

export default i18n;