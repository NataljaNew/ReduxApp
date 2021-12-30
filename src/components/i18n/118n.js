import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from './translations/en.json';
import languageDetector from 'i18next-browser-languagedetector';
import lt from './translations/lt.json';

i18n
    .use(initReactI18next)
    .use(languageDetector)
    .init({
        resources:{
            en, lt
        },
        ns: [],
        whitelist: ['en', 'lt'],
        load:"languageOnly",
        fallbackLng: "en",
        interpolation:{
            escapeValue: false
        }
    });
export default i18n;