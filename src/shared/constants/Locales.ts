import { de, enGB, es, ru, uk } from 'date-fns/locale';

const locales = { en: enGB, ru, uk, es, de } as const;

export default locales;

export enum LANGUAGES_ENUM {
  RU = 'ru',
  EN = 'en',
  DE = 'de',
  ES = 'es',
  FR = 'fr',
}

export const browserLanguageToLanguageMap: { [key: string]: LANGUAGES_ENUM } = {
  'en-US': LANGUAGES_ENUM.EN,
  'en-GB': LANGUAGES_ENUM.EN,
  'en-AU': LANGUAGES_ENUM.EN,
  'en-CA': LANGUAGES_ENUM.EN,
  'en-NZ': LANGUAGES_ENUM.EN,
  'en-ZA': LANGUAGES_ENUM.EN,
  'de-DE': LANGUAGES_ENUM.DE,
  'fr-FR': LANGUAGES_ENUM.FR,
  'es-ES': LANGUAGES_ENUM.ES,
  'zh-CN': LANGUAGES_ENUM.EN,
  'zh-TW': LANGUAGES_ENUM.EN,
  'ja-JP': LANGUAGES_ENUM.EN,
  'ko-KR': LANGUAGES_ENUM.EN,
  'ru-RU': LANGUAGES_ENUM.RU,
};
