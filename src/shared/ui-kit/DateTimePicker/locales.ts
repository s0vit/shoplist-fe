import { Locale } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { useState, useEffect } from 'react';

// Конфигурация локализации для react-day-picker
export const dayPickerLocales: Record<string, Locale> = {
  en: enUS,
  ru: ru,
};

// Получение текущей локали
export const getCurrentDayPickerLocale = (): Locale => {
  const currentLang = localStorage.getItem('i18nextLng') || 'en';

  return dayPickerLocales[currentLang] || enUS;
};

// Хук для получения текущей локали с реактивностью
export const useDayPickerLocale = (): Locale => {
  const [locale, setLocale] = useState<Locale>(() => {
    const currentLang = localStorage.getItem('i18nextLng') || 'en';

    return dayPickerLocales[currentLang] || enUS;
  });

  useEffect(() => {
    const handleLanguageChange = () => {
      const currentLang = localStorage.getItem('i18nextLng') || 'en';
      setLocale(dayPickerLocales[currentLang] || enUS);
    };

    // Слушаем изменения в localStorage
    window.addEventListener('storage', handleLanguageChange);

    // Также слушаем события изменения языка через i18next
    const handleI18nChange = () => {
      const currentLang = localStorage.getItem('i18nextLng') || 'en';
      setLocale(dayPickerLocales[currentLang] || enUS);
    };

    // Добавляем слушатель для событий i18next
    window.addEventListener('i18nextLng', handleI18nChange);

    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      window.removeEventListener('i18nextLng', handleI18nChange);
    };
  }, []);

  return locale;
};
